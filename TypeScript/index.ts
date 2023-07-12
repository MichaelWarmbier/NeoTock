import * as Neo from './methods';
import * as blessed from 'blessed';
import { color } from './methods'; 

Neo.setClockColor(color.Green)

const program = blessed.program();
const screen = blessed.screen({ 
    smartCSR: true,
})

screen.on('keypress', () => {  });
screen.key(['C-c'], () => { process.exit(0); })
program.hideCursor();

const clockFace = blessed.text({
    content: Neo.updateClock("4:45"),
    top: 'center',
    left: 'center',
})

screen.append(clockFace);
screen.render();