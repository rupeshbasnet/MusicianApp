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

var sequencer2 = new Nexus.Sequencer('#drums', {
    'size': [600, 150],
    'mode': 'toggle',
    'rows': 4,
    'columns': 16
})

var notes = ["Kick", "Sistersnare", "Hat", "Hihat"];

sequencer2.colorize("accent", "orange");

var loop = new Tone.Sequence((time, col) => {
    var column = sequencer2.matrix.column(col);
    for (var i = 0; i < 4; i++) {
        if (column[i]) {
            //console.log("Got in");
            var vel = Math.random() * 0.5 + 0.5;
            drums.get(notes[i]).start(time, 0, "16n", 0, vel);
        }
    }
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

Tone.Transport.start();
//sequencer2.start();
loop.start();

Tone.Transport.bpm.value = 100;
// sequencer2.on('step', function(v) {
//     if (v[0] == 1) { kick.start(); }
//     if (v[1] == 1) { sistersnare.start(); }
//     if (v[2] == 1) { hat.start(); }
//     if (v[3] == 1) { hihat.start(); }

//     output = v;
// });

// sequencer2.on('change',function(v) {
//     var socket = io();
//     socket.emit('beat2', sequencer2.matrix.pattern);
//     //console.log(sequencer.matrix.pattern);
//     socket.on('beat2', function( data ) {
//       sequencer2.matrix.set.all(data);
//       console.log(data);
//     });
// });

seqs.push(sequencer2);