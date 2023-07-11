export enum Color {
    Red,
    Blue,
    Green,
    Yellow,
    Orange,
    White,
    Purple,
    Cyan
}

export type clockData = {
    clockType: string;
    clockColor: string;
    displayMS: boolean;
    primaryZone: number;
    secondaryZone: number;
    secondClockActive: boolean;
}

export type alarmData = {
    alarmSet: boolean;
    timerSet: boolean;
    alarmMet: boolean;
    alarmThresh: number;
    alarmDismissed: boolean;
    timerStart: number;
    timerDuration: number;
}

console.log("test 123");