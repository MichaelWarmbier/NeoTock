import * as blessed from 'blessed';

/////////////////////////////
/////* Blessed Objects */////
/////////////////////////////

export const terminal = blessed.screen({ 
    smartCSR: true,
})

export const boundingBox = blessed.box({
    top: 'center',
    left: 'center',
    width: '180%',
    height: '25%',
  });
  
export let clockFace = blessed.text({
    content: '',
    top: 'center',
    left: 'center',
    style: {
        fg: 'white',
    },
})

export let clockStatus = blessed.text({
    content: '',
    bottom: 0,
    left: 'center',
    style: {
        fg: 'white',
    },
})

//////////////////////
/////* App Data */////
//////////////////////

export let NTAlarm = {
    alarmSet: false,
    timerSet: false,
    alarmMet: true,
    alarmThresh: 0,
    alarmDismissed: true,
    timerStart: false,
    timerDuration:  0,
}

export let NTClock = {
    clockType: 'default',
    clockColor: 'white',
    displaySeconds: true,
    primaryZone: 'America/New_York',
    secondaryZone: 0,
    secondClockActive: false,
    militaryTime: false,
}

export const dW:number = 10;
export const dH:number = 5;

export let digits:string[][] = 
[
    [
        "████████  ",
        "██    ██  ",
        "██    ██  ",
        "██    ██  ",
        "████████  ",
    ],
    [
        "   ██     ",
        "█████     ",
        "   ██     ",
        "   ██     ",
        "████████  ",
    ],
    [
        "████████  ",
        "      ██  ",
        "████████  ",
        "██        ",
        "████████  ",
    ],
    [
        "████████  ",
        "      ██  ",
        "  ██████  ",
        "      ██  ",
        "████████  ",
    ],
    [
        "██    ██  ",
        "██    ██  ",
        "████████  ",
        "      ██  ",
        "      ██  ",
    ],
    [
        "████████  ",
        "██        ",
        "████████  ",
        "      ██  ",
        "████████  ",
    ],
    [
        "████████  ",
        "██        ",
        "████████  ",
        "██    ██  ",
        "████████  ",
    ],
    [
        "████████  ",
        "      ██  ",
        "    ██    ",
        "    ██    ",
        "    ██    ",
    ],
    [
        "████████  ",
        "██    ██  ",
        "████████  ",
        "██    ██  ",
        "████████  ",
    ],
    [
        "████████  ",
        "██    ██  ",
        "████████  ",
        "      ██  ",
        "      ██  ",
    ],
    [
        "      ",
        " ██   ",
        "      ",
        " ██   ",
        "      ",
    ],
    [
        "      ",
        "      ",
        "      ",
        "      ",
        "      ",
    ],
    [
        "                 ",
        "██████ ████  ████",
        "██  ██ ██  ██  ██",
        "██████ ██      ██",
        "██     ██      ██",
        "                 ",
    ],
    [
        "                 ",
        "  ██   ████  ████",
        "██  ██ ██  ██  ██",
        "██████ ██      ██",
        "██  ██ ██      ██",
        
    ]
]