import * as _ from './storage';
import { NTClock, clr } from './storage';
export let color = clr;

//////////////////////
/////* Internal */////
//////////////////////

function createTimeString(color: _.clr, ...arr: string[][]) {
    let result: string = color;
    for (let i = 0; i < _.dH; i++) {
        for (let j = 0; j < arr.length; j++)
            result += arr[j][i];
        result += '\n';
    }
    return result + _.clr.White;
}

//////////////////////
/////* External */////
//////////////////////

export function setClockColor(color: _.clr) { NTClock.clockColor = color; }

export function reportError(msg: string) { console.log(`${_.clr.Red} ERROR: ${_.clr.White}${msg}`); }

export function updateClock(time: string) {
    console.log(createTimeString(NTClock.clockColor, _._1, _._2, _.colon, _._3, _._0));
}
