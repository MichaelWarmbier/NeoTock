import * as Neo from './methods';
import * as blessed from 'blessed';
import { color } from './methods'; 

Neo.setClockColor(color.Red)
Neo.updateClock("");

/*
const screen = blessed.screen({ 
    smartCSR: true,
})

screen.on('keypress', () => {  });
screen.key(['C-c'], () => { process.exit(0); })

const digit_1 = blessed.text({
    content: '████████',
    top: 'center',
    left: 'center',
})

screen.append(digit_1);
screen.render();
*/