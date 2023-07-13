import * as _ from './storage';
import { NTClock, NTAlarm, clockFace, clockStatus, secondFace } from './storage';
import { primaryLocation, secondaryLocation, boundingBox } from './storage'; 
import { clock } from './index'
const mtz= require('moment-timezone');

//////////////////////
/////* Internal */////
//////////////////////

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

export function printError(msg:string) {
    console.log(`\u001b[31mERROR:\u001b[0m ${msg}`);
}

export function updateClock() {

    // First Clock
    let format = `${NTClock.militaryTime ? 'HH' : 'hh'}:mm${NTClock.displaySeconds ? ':ss' : ''} ${NTClock.militaryTime ? '' : 'A'}`; 
    let displayTime:any = mtz().tz(NTClock.primaryZone).format(format);
    let currentTime:string[][] = string2display(displayTime);

    let timerStatus = `Timer: ${NTAlarm.timerSet ? 'tba' : 'Not Set'}`;
    let alarmStatus = `Alarm: ${NTAlarm.timerSet ? 'tba' : 'Not Set'}`;
    let todaysDate = mtz().tz(NTClock.primaryZone).format('dddd, MMMM Do, YYYY');

    clockFace.content = createTimeString(...currentTime);
    clockFace.style.fg = NTClock.clockColor;
    primaryLocation.content = NTClock.primaryZone;

    // Second Clock
    if (NTClock.secondClockActive) {
        displayTime = mtz().tz(NTClock.secondaryZone).format(format);
        currentTime = string2display(displayTime);
        secondFace.content = createTimeString(...currentTime);
        secondFace.style.fg = NTClock.secondClockColor;
        secondaryLocation.content = NTClock.secondaryZone;
    }

    // Alarm and Timer
    clockStatus.content = ` ${timerStatus} | ${alarmStatus} | ${todaysDate} `;

}
