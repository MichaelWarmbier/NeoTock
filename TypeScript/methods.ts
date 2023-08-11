import * as _ from './storage';
import { NTClock, NTAlarm, clockFace, clockStatus, secondFace, alertBox } from './storage';
import { primaryLocation, secondaryLocation, boundingBox, terminal } from './storage'; 
import { clock } from './index'
import * as fs from 'fs';
const mtz= require('moment-timezone');
const audio = require('Speaker');

//////////////////////
/////* Internal */////
//////////////////////

let ErrorString:string = '';

function createTimeString(...arr: string[][]) {
    let result: string = '';
    for (let y = 0; y < _.dH; y++) {
        for (let x = 0; x < arr.length; x++)
            result += arr[x][y];
        result += '\n';
    }
    return result;
}


function addTimeToString(time:string, offset:number) {
    if (offset > 60) offset = 60;

    const TOD = time.includes('AM');
    const hours = parseInt(time[0] + time[1]);
    const minutes = parseInt(time[3] + time[4]);

    let newMinutes:string = ((minutes + offset) % 60).toString();
    let newHours:string = (hours + Math.floor((minutes + offset) / 60)).toString();
  
    if (NTClock.militaryTime && parseInt(newHours) >= 24) newHours = (parseInt(newHours) % 24).toString();
    if (!NTClock.militaryTime && parseInt(newHours) > 12) newHours = (parseInt(newHours) % 12).toString();
    if (!NTClock.militaryTime && parseInt(newHours) >= 12) {
      if (TOD)   time = time.replace('AM', 'PM');
      else       time = time.replace('PM', 'AM');
    }

    if (newMinutes.length == 1) newMinutes = newMinutes.replace(/^/, '0');
    if (newHours.length == 1) newHours = newHours.replace(/^/, '0');

    time = time.replace(minutes.toString(), newMinutes);
    time = time.replace(hours.toString(), newHours);
  
    return time;
}

function string2display(time:string) {
    let result = [];
    for (let char = 0; char < time.length; char++) { 
        if (time[char] == ':') {
            if (clock) result.push(_.digits[10]);
            else       result.push(_.digits[11]);
        }
        else if (time[char] == ' ') result.push(_.digits[11]);
        else if (time[char] == 'P') { result.push(_.digits[12]); break; }
        else if (time[char] == 'A') { result.push(_.digits[13]); break; }
        else result.push(_.digits[parseInt(time[char])]);
    }
    return result;
}

function ms2timer(timer:number) {
    let hours:number = Math.floor(timer / 3600000);
    let minutes:number = Math.floor((timer - (hours * 3600000)) / 60000)
    let seconds:number = Math.floor((timer - (hours * 3600000) - (minutes * 60000)) / 1000)
    return `${hours}h ${minutes}m ${seconds}s`;
}

let audioOutput;

function playAlarm() {
    if (!NTAlarm.alarmDismissed) {
        if (NTAlarm.alarmMet) printError('Alarm is ringing! (Press P to snooze)');
        else printError('Alarm is ringing!');
        audioOutput = new audio();
        let audioStream = fs.createReadStream(NTAlarm.audioPath);
        audioStream.pipe(audioOutput);
        audioStream.on('close', () => { playAlarm(); })
    }
}

//////////////////////
/////* External */////
//////////////////////

export function setTimer(seconds:number) {
    setTimeout(() => {
        NTAlarm.alarmDismissed = false;
        NTAlarm.timerMet = true;
        playAlarm();
    }, seconds)

}

export function printError(msg:string) { ErrorString = msg; }

export function updateClock() {
    
    // First Clock
    let format = `${NTClock.militaryTime ? 'HH' : 'hh'}:mm${NTClock.displaySeconds ? ':ss' : ''} ${NTClock.militaryTime ? '' : 'A'}`; 
    let displayTime:any = mtz().tz(NTClock.primaryZone).format(format);
    let currentTime:string[][] = string2display(displayTime);

    let timerStatus = `Timer: ${NTAlarm.timerSet ? ms2timer(NTAlarm.timerDuration) : 'Not Set'}`;
    let alarmStatus = `Alarm: ${NTAlarm.alarmThresh ? NTAlarm.alarmThresh : 'Not Set'}`;
    let todaysDate = mtz().tz(NTClock.primaryZone).format('dddd, MMMM Do, YYYY');
    let snoozedStatus = `${NTAlarm.alarmMet && NTAlarm.alarmDismissed && NTAlarm.alarmThresh ? "Snoozed" : "Not Snoozed"}`;

    clockFace.setText(createTimeString(...currentTime));
    clockFace.style.fg = NTClock.clockColor;
    primaryLocation.content = NTClock.primaryZone;

    // Second Clock
    if (NTClock.secondClockActive) {
        displayTime = mtz().tz(NTClock.secondaryZone).format(format);
        currentTime = string2display(displayTime);
        secondFace.setText(createTimeString(...currentTime));
        secondFace.style.fg = NTClock.secondClockColor;
        secondaryLocation.content = NTClock.secondaryZone;
    }

    // Timer
    if (NTAlarm.timerDuration != 0) NTAlarm.timerDuration -= 1000;

    // Alarm
    format = `${NTClock.militaryTime ? 'HH' : 'hh'}:mm${NTClock.militaryTime ? '' : ' A'}`; 
    displayTime = mtz().tz(NTClock.primaryZone).format(format);
    if (displayTime == NTAlarm.alarmThresh && !NTAlarm.alarmMet) {
        NTAlarm.alarmDismissed = false;
        NTAlarm.alarmMet = true;
        playAlarm();
    } 

    clockStatus.content = `${timerStatus} | ${alarmStatus} | ${snoozedStatus} | ${todaysDate} `;

    // AlertBox
    if (ErrorString) alertBox.setText(`Warning: ${ErrorString} (Press O to dismiss)`);
    else if (ErrorString == '') alertBox.setText('')

    // Handle Errors
    if (!NTAlarm.audioPath.includes('.pcm')) {
        printError('Alarm file not in \'.pcm\' format. Alarm will not play')
        return;
    }
    if (!NTAlarm.alarmThresh) return;
    if (((NTAlarm.alarmThresh.includes('AM') || NTAlarm.alarmThresh.includes('PM')) && NTClock.militaryTime))
        printError('Alarm argument not in military time format! Example: 05:23')
    if (((!NTAlarm.alarmThresh.includes('AM') && !NTAlarm.alarmThresh.includes('PM')) && !NTClock.militaryTime))
        printError('Alarm is not in normal time format! Example: 03:40 PM')
}