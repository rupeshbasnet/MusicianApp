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