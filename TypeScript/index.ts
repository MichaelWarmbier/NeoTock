import * as Neo from './methods';
import * as blessed from 'blessed';
import * as data from './storage';


////////////////////////
/////* Initialize */////
////////////////////////

process.stdout.write('\u001b[?25l');
export let clock:boolean = false; 
data.terminal.on('keypress', () => {  });
data.terminal.key(['C-c'], () => { process.exit(0); })

Neo.updateClock();
data.boundingBox.append(data.clockFace);
data.boundingBox.append(data.clockStatus);
data.terminal.append(data.boundingBox);
data.terminal.render();


////////////////////////
/////* Clock Loop */////
////////////////////////

Neo.setClockColor('blue');

setInterval(function() {
    clock = !clock;
    Neo.updateClock();
    data.boundingBox.screen.render();
}, 1000)
