/* ------------ Synth ------------ */
var synth = new Tone.Synth().toMaster();

var synthSequencer = new Nexus.Sequencer('#synth', {
    'size': [704, 352],
    'mode': 'toggle',
    'rows': 8,
    'columns': 16
})
synthSequencer.colorize("accent", "black");

var synthNotes = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3"];

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

// synthSequencer.on('change',function(v) {
//     var socket = io();
//     socket.emit('beat1', synthSequencer.matrix.pattern);
//     //console.log(synthSequencer.matrix.pattern);
//     socket.on('beat1', function( data ) {
//       synthSequencer.matrix.set.all(data);
//       console.log(data);
//     });
// });