import * as Neo from './methods';
import * as blessed from 'blessed';
import * as data from './storage';
import * as fs from 'fs';


////////////////////////
/////* Initialize */////
////////////////////////

export let clock:boolean = false; 

async function applyPreferences() {
    fs.readFile('pref.json', 'utf8', (err, json) => {
        if (err) { Neo.printError("Unable to located 'pref.json.'"); }
        try { const prefs = JSON.parse(json); }
        catch (err) { Neo.printError("Unable to read 'pref.json' file."); }
        const prefs = JSON.parse(json);
        data.NTClock.clockColor = prefs.primaryClockPreferences.COLOR;
        data.NTClock.secondClockColor = prefs.secondaryClockPreferences.COLOR;
        data.NTClock.displaySeconds = prefs.generalPreferences.secondsVisible;
        data.NTClock.primaryZone = prefs.primaryClockPreferences.ZONE;
        data.NTClock.secondaryZone = prefs.secondaryClockPreferences.ZONE;
        data.NTClock.secondClockActive = prefs.generalPreferences.secondClockVisible;
        data.NTClock.militaryTime = prefs.generalPreferences.militaryTime;
        data.NTClock.borderVisible = prefs.generalPreferences.borderVisible; // Issue
    })
}

async function initializeDisplay() {
    process.stdout.write('\u001b[?25l');
    data.terminal.on('keypress', () => {  });
    data.terminal.key(['C-c'], () => { process.exit(0); })

    data.boundingBox.append(data.secondFace);
    data.boundingBox.append(data.clockFace);
    data.boundingBox.append(data.clockStatus);
    data.boundingBox.append(data.primaryLocation);
    data.boundingBox.append(data.secondaryLocation);
    data.terminal.append(data.boundingBox);
    data.terminal.render();
}

////////////////////////
/////* Clock Loop */////
////////////////////////

async function updateApp() {
    setInterval(function() {
        clock = !clock;
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