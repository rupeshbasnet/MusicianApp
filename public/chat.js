var socket = io();
Nexus.context = Tone.context
output = [];

var drums = new Tone.Players({
    "Hihat": "/vendor/Samples/hihat.wav",
    "Hat": "/vendor/Samples/hat.wav",
    "Sistersnare": "/vendor/Samples/sistersnare.wav",
    "Kick": "/vendor/Samples/kick.wav"
}, {
    "volume": "10",
    "fadeOut": "64n",
}).toMaster();

var drumSequencer = new Nexus.Sequencer('#drums', {
    'size': [704, 176],
    'mode': 'toggle',
    'rows': 4,
    'columns': 16
})

var slider = new Nexus.Slider('#slider', {
    'size': [600, 20],
    'mode': 'relative', // 'relative' or 'absolute'
    'min': 60,
    'max': 200,
    'step': 1,
    'value': 120
})

var notes = ["Hihat", "Hat", "Sistersnare", "Kick" ];

var synth = new Tone.Synth().toMaster();

var synthSequencer = new Nexus.Sequencer('#synth', {
    'size': [704, 352],
    'mode': 'toggle',
    'rows': 8,
    'columns': 16
})

synthSequencer.colorize("accent", "black");

var synthNotes = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3"];

drumSequencer.colorize("accent", "orange");

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

document.getElementById('join_room').addEventListener('click', (e) => {
	socket.emit('room.join', document.getElementById('room').value);
});

// document.getElementById('say_hello').addEventListener('click', (e) => {
// 	socket.emit('event', {

// 	});
// })

var addLi = (message) => {
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	document.getElementById('list').appendChild(li);
};

socket.on('event', addLi);

/* ------------ Drums ------------ */
// Used Tone.Players for optimization

function loopDrum(time, col) {
    var column = drumSequencer.matrix.column(col);
    for (var i = 0; i < 4; i++) {
        if (column[i]) {
            var vel = Math.random() * 0.5 + 0.5;
            drums.get(notes[i]).start(time, 0, "16n", 0, vel);
            drumSequencer.stepper.value = col;
        }
    }
}

function loopSynth(time, col) {
    var column = synthSequencer.matrix.column(col);
    for (var i = 0; i < 8; i++) {
        if (column[i]) {
            var vel = Math.random() * 0.5 + 0.5;
            synth.triggerAttackRelease(synthNotes[i], '16n');
            synthSequencer.stepper.value = col;
        }
    }
}

function synthEmit(){
  socket.emit('synth', 
  { room: document.getElementById('room').value,
  	pattern: synthSequencer.matrix.pattern});
}

// trigger on every cell release
for(let cell of $('#synth div').children())
{
  cell.addEventListener('mouseup', synthEmit);
  cell.addEventListener('touchend', synthEmit);
}

// trigger even when mouse up is off the grid
$(document).on('mouseup', synthEmit);

socket.on('synth', function( data ) {
  synthSequencer.matrix.set.all(data);
  //console.log(data);
});


function drumsEmit() {
  socket.emit('drums', 
  { room: document.getElementById('room').value,
  	pattern: drumSequencer.matrix.pattern});
}

for(let cell of $('#drums div').children())
{
  cell.addEventListener('mouseup', drumsEmit);
  cell.addEventListener('touchend', drumsEmit);
}

$(document).on('mouseup', drumsEmit);

socket.on('drums', function( data ) {
  drumSequencer.matrix.set.all(data);
  //console.log(data);
});

slider.on('change', function(v) {
    console.log(v);
    Tone.Transport.bpm.value = parseFloat(v);
    //tempoEmit();
});

function tempoEmit(){
  var val = slider.value;
  socket.emit('tempo', 
  { room: document.getElementById('room').value,
    val: val});
}

// for Desktop, hacky
$('svg')[0].addEventListener('mousemove', function(e){
  if(e.buttons == 1)
    window.addEventListener('mousemove', tempoEmit, { once: true });
});

// Mobile
$('svg')[0].addEventListener('touchmove', tempoEmit);

socket.on('tempo', function( data ) {
  //console.log(parseInt(data.value));
 var valueInt = parseInt(data);
 slider.value = valueInt;
  
});

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

