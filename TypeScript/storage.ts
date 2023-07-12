import * as blessed from 'blessed';


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
    clockColor: 'cyan',
    secondClockColor: 'cyan',
    displaySeconds: true,
    primaryZone: 'America/New_York',
    secondaryZone: 'America/Chicago',
    secondClockActive: true,
    militaryTime: false,
    borderVisible: true,
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

/////////////////////////////
/////* Blessed Objects */////
/////////////////////////////

export const terminal = blessed.screen({ 
    smartCSR: true,
})

export const boundingBox = blessed.box({
    top: 'center',
    left: 'center',
    width: '200%',
    height: NTClock.secondClockActive ? 24 : 10,
    border: NTClock.borderVisible ? 'line' : 'bg',
  });
  
export let clockFace = blessed.text({
    content: '',
    top: NTClock.secondClockActive ? '50%+1' : '50%-4',
    left: 'center',
    style: {
        fg: 'white',
    },
})

export let secondFace = blessed.text({
    content: '',
    top: '50%-10',
    left: 'center',
    style: {
        fg: 'white',
    },
})

export let primaryLocation = blessed.text({
    content: '',
    top: NTClock.secondClockActive ? '50%+7' : '50%+2',
    left: 'center',
    style: {
        fg: 'white',
    },
})

export let secondaryLocation = blessed.text({
    content: '',
    top: '50%-4',
    left: 'center',
    style: {
        fg: 'white',
    },
})

export let clockStatus = blessed.text({
    content: '',
    top: NTClock.secondClockActive ? '50%+10' : '50%+3',
    left: 'center',
    style: {
        fg: 'white',
    },
})