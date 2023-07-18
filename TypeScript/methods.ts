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
    for (let i = 0; i < _.dH; i++) {
        for (let j = 0; j < arr.length; j++)
            result += arr[j][i];
        result += '\n';
    }
    return result;
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

//////////////////////
/////* External */////
//////////////////////

export function printError(msg:string) { ErrorString = msg; }

export function updateClock() {
    
    // First Clock
    let format = `${NTClock.militaryTime ? 'HH' : 'hh'}:mm${NTClock.displaySeconds ? ':ss' : ''} ${NTClock.militaryTime ? '' : 'A'}`; 
    let displayTime:any = mtz().tz(NTClock.primaryZone).format(format);
    let currentTime:string[][] = string2display(displayTime);

    let timerStatus = `Timer: ${NTAlarm.timerSet ? 'tba' : 'Not Set'}`;
    let alarmStatus = `Alarm: ${NTAlarm.alarmThresh ? NTAlarm.alarmThresh : 'Not Set'}`;
    let todaysDate = mtz().tz(NTClock.primaryZone).format('dddd, MMMM Do, YYYY');

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

    // Alarm and Timer
    format = `${NTClock.militaryTime ? 'HH' : 'hh'}:mm${NTClock.militaryTime ? '' : ' A'}`; 
    displayTime = mtz().tz(NTClock.primaryZone).format(format);
    if (displayTime == NTAlarm.alarmThresh && !NTAlarm.alarmMet) {
        NTAlarm.alarmDismissed = false;
        NTAlarm.alarmMet = true;
        playAlarm();
    } 

    clockStatus.content = ` ${timerStatus} | ${alarmStatus} | ${todaysDate} `;

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

let audioOutput;

export async function playAlarm() {
    if (!NTAlarm.alarmDismissed) {
        printError('Alarm is ringing!');
        audioOutput = new audio();
        let audioStream = fs.createReadStream(NTAlarm.audioPath);
        audioStream.pipe(audioOutput);
        audioStream.on('close', () => { playAlarm(); })
    }
}