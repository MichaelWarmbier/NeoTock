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
        clockAllowed = prefs.generalPreferences.animatedBlink;
    } catch (err) {
        Neo.printError("'pref.json' is incorrect defined. Some preferences may not work."); return;
    }
}

async function initializeDisplay() {
    process.stdout.write('\u001b[?25l');
    data.terminal.on('keypress', () => {  });
    data.terminal.key(['C-c'], () => { process.exit(0); })
    data.terminal.key(['o'], () => { Neo.printError(''); })

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
    await data.initializeDisplayElements();
    await initializeDisplay();
    await updateApp();
}

main();