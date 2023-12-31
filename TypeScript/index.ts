import * as Neo from './methods';
import * as blessed from 'blessed';
import * as data from './storage';
import * as fs from 'fs';


console.log('/a')

////////////////////////
/////* Initialize */////
////////////////////////

export let clock:boolean = true; 
let clockAllowed = true;

async function applyPreferences() {

    const args = process.argv;

    // Alarm Argument Handle
    if (args.indexOf('-a') != -1) data.NTAlarm.alarmThresh = args[args.indexOf('-a') + 1];

    // Timer Argument Handle
    if (args.indexOf('-t') != -1) {
        if (args.indexOf('-m') != -1 || args.indexOf('-h')) {
            let duration:number = args.indexOf('-m') != -1 ? parseInt(args[args.indexOf('-m') + 1]) : 0;
            duration += 60 * (args.indexOf('-h') != -1 ? parseInt(args[args.indexOf('-h') + 1]) : 0);
            data.NTAlarm.timerDuration = duration * 60000;
            data.NTAlarm.timerSet = true;
            Neo.setTimer(data.NTAlarm.timerDuration);
        }
        else Neo.printError("Incorrect timer arguments. Timer not set.");
    } 

    if (data.NTAlarm.alarmThresh[1] == ':') data.NTAlarm.alarmThresh = '0' + data.NTAlarm.alarmThresh;

    let prefs: any, json: any;
    try { json = await fs.promises.readFile('pref.json', 'utf8'); } 
    catch (err) { Neo.printError("'prefs.json' can not be found. Defaults will be used."); return; }
    try { prefs = JSON.parse(json); }
    catch (err) { Neo.printError("'pref.json' is malformed. Defaults will be used."); return; }
    try {
        data.NTClock.clockColor = prefs.primaryClockPreferences.COLOR;
        data.NTClock.secondClockColor = prefs.secondaryClockPreferences.COLOR;
        data.NTClock.displaySeconds = prefs.generalPreferences.secondsVisible;
        data.NTClock.primaryZone = prefs.primaryClockPreferences.ZONE;
        data.NTClock.secondaryZone = prefs.secondaryClockPreferences.ZONE;
        data.NTClock.secondClockActive = prefs.generalPreferences.secondClockVisible;
        data.NTClock.militaryTime = prefs.generalPreferences.militaryTime;
        data.NTClock.borderVisible = prefs.generalPreferences.borderVisible;
        data.NTAlarm.audioPath = 'Audio/' + prefs.generalPreferences.alarmAudioFile;
        data.NTAlarm.snoozeDuration = prefs.generalPreferences.snoozeDurationMinutes * 4000;
        clockAllowed = prefs.generalPreferences.animatedBlink;
    } catch (err) {
        Neo.printError("'pref.json' is incorrect defined. Some preferences may not work."); return;
    }
}

async function initializeDisplay() {
    process.stdout.write('\u001b[?25l');
    data.terminal.on('keypress', () => {  });
    data.terminal.key(['C-c'], () => { process.exit(0); })
    data.terminal.key(['o'], () => { 
        Neo.printError('');
        if (data.NTAlarm.timerMet) data.NTAlarm.timerMet = false;
        if (data.NTAlarm.alarmThresh) { 
            data.NTAlarm.alarmThresh = '';
            data.NTAlarm.alarmMet = false;
        }
        data.NTAlarm.alarmDismissed = true;

    })
    data.terminal.key(['p'], () => { 
        Neo.printError('');
        if (data.NTAlarm.timerMet) return;
        data.NTAlarm.alarmDismissed = true;
        data.NTAlarm.alarmMet = true;
        if (data.NTAlarm.alarmMet) Neo.setTimer(data.NTAlarm.snoozeDuration)
    })

    data.boundingBox.append(data.secondFace);
    data.boundingBox.append(data.clockFace);
    data.boundingBox.append(data.clockStatus);
    data.boundingBox.append(data.primaryLocation);
    data.boundingBox.append(data.secondaryLocation);
    data.boundingBox.append(data.alertBox);
    data.terminal.append(data.boundingBox);
    data.terminal.render();
}


////////////////////////
/////* Clock Loop */////
////////////////////////

async function updateApp() {
    setInterval(function() {
        if (clockAllowed) clock = !clock;
        Neo.updateClock();
        data.terminal.screen.render();
    }, 1000)   
}

//////////////////
/////* Main */////
//////////////////

async function main() {
    await applyPreferences();
    data.initializeDisplayElements();
    initializeDisplay();
    updateApp();
}

main();