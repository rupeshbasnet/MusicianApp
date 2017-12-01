var slider = new Nexus.Slider('#slider', {
    'size': [600, 20],
    'mode': 'relative', // 'relative' or 'absolute'
    'min': 60,
    'max': 200,
    'step': 1,
    'value': 120
})

// Global Loop
var loop = new Tone.Sequence((time, col) => {
    //Loop Drum Sequencer
    loopDrum(time, col);
    //Loop Synth Sequencer
    loopSynth(time, col);
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

Tone.Transport.start();

var number = new Nexus.Number('#tempodisplay')
Tone.Transport.bpm.value = slider.value;
number.link(slider);

slider.on('change', function(v) {
    console.log(v);
    Tone.Transport.bpm.value = parseFloat(v);
    //tempoEmit();
});

//send tempo over socket
var socket = io();
socket.on('tempo', function( data ) {
  slider.value = parseInt(data);
  //console.log(data);
});

function tempoEmit(){
  socket.emit('tempo', slider.value);
}

// for Desktop, hacky
$('svg')[0].addEventListener('mousemove', function(e){
  if(e.buttons == 1)
    window.addEventListener('mousemove', tempoEmit, { once: true });
});

// Mobile
$('svg')[0].addEventListener('touchmove', tempoEmit);

var textbutton = new Nexus.TextButton('#button', {
    'size': [150, 50],
    'state': false,
    'text': 'Play',
    'alternate': false,
    'alternateText': 'Stop'
})

textbutton.on('change', function(v) {
    console.log(v);
    textbutton.alternateText = 'Stop';
    if (v) {
        loop.start();
    } else {
        loop.stop();
    }
});
