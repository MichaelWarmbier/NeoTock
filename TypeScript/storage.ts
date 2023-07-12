export enum clr {
    Black = `\x1b[30m`,
    Red = `\x1b[31m`,
    Green = `\x1b[32m`,
    Yellow = `\x1b[33m`,
    Blue = `\x1b[34m`,
    Purple = `\x1b[35m`,
    Cyan = `\x1b[36m`,
    White = `\x1b[37m`,
}

export let NTClock = {
    clockType: 'default',
    clockColor: clr.White,
    displayMS: false,
    primaryZone: 0,
    secondaryZone: 0,
    secondClockActive: false,
}

export let NTalarm = {
    alarmSet: false,
    timerSet: false,
    alarmMet: true,
    alarmThresh: 0,
    alarmDismissed: true,
    timerStart: false,
    timerDuration:  0,
}

export const dW:number = 10;
export const dH:number = 5;

export const _0:string[] = [
    "████████  ",
    "██    ██  ",
    "██    ██  ",
    "██    ██  ",
    "████████  ",
]

export const _1:string[] = [
    "   ██     ",
    "█████     ",
    "   ██     ",
    "   ██     ",
    "████████  ",
]

export const _2:string[] = [
    "████████  ",
    "      ██  ",
    "  ██████  ",
    "██        ",
    "████████  ",
]

export const _3:string[] = [
    "████████  ",
    "      ██  ",
    "  ██████  ",
    "      ██  ",
    "████████  ",
]

export const _4:string[] = [
    "██    ██  ",
    "██    ██  ",
    "████████  ",
    "      ██  ",
    "      ██  ",
]

export const _5:string[] = [
    "████████  ",
    "██        ",
    "████████  ",
    "      ██  ",
    "████████  ",
]

export const _6:string[] = [
    "████████  ",
    "██        ",
    "████████  ",
    "██    ██  ",
    "████████  ",
]


export const _7:string[] = [
    "████████  ",
    "      ██  ",
    "    ██  "  ,
    "    ██    ",
    "    ██    ",
]

export const _8:string[] = [
    "████████  ",
    "██    ██  ",
    "████████  ",
    "██    ██  ",
    "████████  ",
]

export const _9:string[] = [
    "████████  ",
    "██    ██  ",
    "████████  ",
    "      ██  ",
    "      ██  ",
]

export const colon:string[] = [
    "          ",
    "    ██    ",
    "          ",
    "    ██    ",
    "          ",
]