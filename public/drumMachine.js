Nexus.context = Tone.context
output = [];

/* ------------ Drums ------------ */
// Used Tone.Players for optimization

var drums = new Tone.Players({
    "Kick": "/vendor/Samples/kick.wav",
    "Sistersnare": "/vendor/Samples/sistersnare.wav",
    "Hat": "/vendor/Samples/hat.wav",
    "Hihat": "/vendor/Samples/hihat.wav",
}, {
    "volume": "10",
    "fadeOut": "64n",
}).toMaster();

var drumSequencer = new Nexus.Sequencer('#drums', {
    'size': [600, 150],
    'mode': 'toggle',
    'rows': 4,
    'columns': 16
})

var notes = ["Kick", "Sistersnare", "Hat", "Hihat"];

drumSequencer.colorize("accent", "orange");

var loop = new Tone.Sequence((time, col) => {
    var column = drumSequencer.matrix.column(col);
    for (var i = 0; i < 4; i++) {
        if (column[i]) {
            //console.log("Got in");
            var vel = Math.random() * 0.5 + 0.5;
            drums.get(notes[i]).start(time, 0, "16n", 0, vel);
            //drumSequencer.next();
        }
    }
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

Tone.Transport.start();
//drumSequencer.start();
loop.start();


var slider = new Nexus.Slider('#slider', {
    'size': [600, 20],
    'mode': 'relative', // 'relative' or 'absolute'
    'min': 80,
    'max': 200,
    'step': 1,
    'value': 0
})

var number = new Nexus.Number('#tempodisplay')
Tone.Transport.bpm.value = 80;
number.link(slider);

slider.on('change', function(v) {
    console.log(v);
    Tone.Transport.bpm.value = parseFloat(v);
})

// drumSequencer.on('change',function(v) {
//     var socket = io();
//     socket.emit('beat2', drumSequencer.matrix.pattern);
//     //console.log(sequencer.matrix.pattern);
//     socket.on('beat2', function( data ) {
//       drumSequencer.matrix.set.all(data);
//       console.log(data);
//     });
// });

seqs.push(drumSequencer);