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
    borderVisible: false,
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
        "      ██  ",
        "      ██  ",
        "      ██  ",
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

export let terminal:any;
export let boundingBox:any;
export let clockFace:any;
export let secondFace:any;
export let primaryLocation:any;
export let secondaryLocation:any;
export let clockStatus:any;

export async function initializeDisplayElements() {
    
    terminal = blessed.screen({ 
        smartCSR: true,
    })
      
    clockFace = blessed.text({
        content: '',
        top: NTClock.secondClockActive ? '50%+1' : '50%-4',
        left: 'center',
        style: {
            fg: 'white',
        },
    })
    
    secondFace = blessed.text({
        content: '',
        top: '50%-10',
        left: 'center',
        style: {
            fg: 'white',
        },
    })
    
    primaryLocation = blessed.text({
        content: '',
        top: NTClock.secondClockActive ? '50%+7' : '50%+2',
        left: 'center',
        style: {
            fg: 'white',
        },
    })
    
    secondaryLocation = blessed.text({
        content: '',
        top: '50%-4',
        left: 'center',
        style: {
            fg: 'white',
        },
    })
    
    clockStatus = blessed.text({
        content: '',
        top: NTClock.secondClockActive ? '50%+10' : '50%+3',
        left: 'center',
        style: {
            fg: 'white',
        },
    })

    boundingBox = blessed.box({
        top: 'center',
        left: 'center',
        width: '200%',
        height: NTClock.secondClockActive ? 24 : 10,
        border: NTClock.borderVisible ? 'line' : 'bg',
      });
}