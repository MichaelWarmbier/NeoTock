import * as _ from './storage';
import { NTClock, NTAlarm, clockFace, clockStatus } from './storage';
import { clock } from './index'

//////////////////////
/////* Internal */////
//////////////////////

function createTimeString(...arr: string[][]) {
    let result: string = '';
    for (let i = 0; i < _.dH; i++) {
        for (let j = 1; j < arr.length; j++)
            result += arr[j][i];
        result += '\n';
    }
    return result;
}

function string2display(time:string) {
    let result = [];
    for (let char = 0; char < time.length; char++) { 
        if (time[char] == ':') {
            if (clock) result.push(_.digits[10])
            else       result.push(_.digits[11]);
        }
        else result.push(_.digits[parseInt(time[char])])
    }
    return result;
}

//////////////////////
/////* External */////
//////////////////////

export function setClockColor(color: string) { NTClock.clockColor = color; }

export function reportError(msg: string) { console.log(`\x1b[31m ERROR: \x1b[37m${msg}`); }

export function updateClock() {
    let currentTime: string[][] = string2display('0:00');
    let timerStatus = `Timer: ${NTAlarm.timerSet ? 'tba' : 'Not Set'}`;
    let alarmStatus = `Alarm: ${NTAlarm.timerSet ? 'tba' : 'Not Set'}`;
    clockFace.content = createTimeString(_.digits[0], ...currentTime);
    clockFace.style.fg = NTClock.clockColor;
    clockStatus.content = `${timerStatus} | ${alarmStatus} | Tuesday July 7th, 2023`;
}
