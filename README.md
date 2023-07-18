# NeoTock

This application was inspired heavily by [Tock by nwtnni](https://github.com/nwtnni/tock). A digital clock housed entirely within the terminal, powered by [Blessed](https://github.com/chjj/blessed/blob/master/README.md#colors). 

<p align="center"><img src="https://michaelwarmbier.github.io/Assets/Previews/neotock.gif"></p>

##### <p align="center">Current Appearance (background not included)</p>

<hr>

### <p align="center">Package Dependencies </p>

* [blessed](https://www.npmjs.com/package/blessed) v.0.1.81
* [@types/blessed](https://www.npmjs.com/package/@types/blessed?activeTab=readme) TSv0.1.22
* [typescript](https://www.npmjs.com/package/moment-timezone) v5.1.6
* [moment-timezone](https://www.npmjs.com/package/moment-timezone) v0.5.43
* [speaker](https://www.npmjs.com/package/speaker) v0.5.4

<br>
<hr>

### <p align="center">Current Features</p>

* An accurate and low powered clock with options for military time and second display.
* Up to two clocks supported per running application.
* An adjustable and automatic alarm with customizable audio.

##### <p align="center"> Feature list not final, more to be added</p>

<hr>

### <p align="center">Installation</p>

Currently this application isn't finished, so installation isn't easily possible at this time. You can still build everything using Node. You may have to install all the necessary libraries then compile the TypeScript.

```
npm install blessed
npm install typescript
npm install @types/blessed
npm install moment-timezone
npm install speaker
npx tsc;
```

In the future this application will be released using NPM.

<br>
<hr>

### <p align="center">Customization</p>


By modifying **pref.json** you can customize your preferences.

```
nano pref.json
```

Below is each option and what it does:

<p align="center">General Preferences</p>

`military time`: whether or not the clock will display using military time. This means the clock will use a 24-hour counter rather than a 12-hour one. <br>
**Default**: `false` (boolean)

`borderVisible`: whether or not the clock will display a border. <br>
**Default**: `false` (boolean)

`secondsVisible`: whether or not the clock will display the current seconds. <br>
**Default**: `false` (boolean)

`secondClockVisible`: whether or not the secondary clock will display. <br>
**Default**: `false` (boolean)

`alarmAudioFile`: the name of the audio file in the `.\Audio` folder to use (on loop) as the alarm sound. As of right now this _must_ be in the `.pcm` format. <br>
**Default**: `alarm.pcm`

`animatedBlink`: whether or not the time separators (colons) will blink. <br>
**Default**: `false` (boolean)

<p align="center">Clock Preferences</p>

`COLOR`: the color of the clock display. Value can be a specific color or a hex value (will default to the closest possible color in ANSI). <br>
**Default**: `#FFFFFF`

`ZONE`: the name of the timezone the clock will associate with. <br>
**Default**: `America/New_York` OR `America/Chicago`


<br>
<hr>

### <p align="center">Finding Your Timezone</p>

You can find your timezone by going to [this list on GitHub](https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a) or by running the following code within the NeoTock folder and sifting through the results:

```
node
const moment = require('moment-timzone');
console.log(moment.tz.names());
```

<br>
<hr>


### <p align="center">Setting an Alarm</p>

You can set an alarm by using arguments; either `-a` or `-alarm`.

```
neotock -a "05:00 PM"
```

**NOTE**: if you are using military time in the `pref.json` file, the format will be `hh:mm`. Example: `03:45`. If you're using normal time, then you must use the following format: `hh:mm TT`. Example: `09:00 PM`.

<br>
<hr>

### <p align="center"> Special Thanks</p>

- [tim.kahn](https://freesound.org/people/tim.kahn/) on [freesound.org](https://freesound.org/) for his [timer.flac](https://freesound.org/people/tim.kahn/sounds/22627/) sound effect.
- My lovely girlfriend for her constant support.

<br>
<hr>


### <p align="center">More information will be added as development continues. </p>