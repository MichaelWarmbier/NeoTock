import * as _ from './storage';
import { NTClock, clr } from './storage';
export let color = clr;

//////////////////////
/////* Internal */////
//////////////////////

function createTimeString(color: _.clr, ...arr: string[][]) {
    let result: string = color;
    for (let i = 0; i < _.dH; i++) {
        for (let j = 1; j < arr.length; j++)
            result += arr[j][i];
        result += '\n';
    }
    return result + _.clr.White;
}

function string2display(time:string) {
    let result = [];
    for (let char = 0; char < time.length; char++) { 
        if (time[char] == ':') result.push(_.digits[10]);
        else result.push(_.digits[parseInt(time[char])])
    }
    return result;
}

//////////////////////
/////* External */////
//////////////////////

export function setClockColor(color: _.clr) { NTClock.clockColor = color; }

export function reportError(msg: string) { console.log(`${_.clr.Red} ERROR: ${_.clr.White}${msg}`); }

export function updateClock(time: string) {
    let currentTime: string[][] = string2display(time);
    return createTimeString(NTClock.clockColor, _.digits[0], ...currentTime);
}
