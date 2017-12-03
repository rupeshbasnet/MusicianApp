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

// synthSequencer.on('click',function(v) {
//     var socket = io();
//     socket.emit('synth', synthSequencer.matrix.pattern);
//     //console.log(synthSequencer.matrix.pattern);
//     console.log('sclick');
//     socket.on('synth', function( data ) {
//       synthSequencer.matrix.set.all(data);
//       //console.log(data);
//     });
// });

// var synth = document.getElementById('synth').children[0];
//
// synth.addEventListener('mousedown', function() {
//   console.log('mousedown');
// })

// for(let cell of synth.children) {
//   cell.addEventListener('mousedown',function() {
//     console.log('mousedown');
//     cell.addEventListener('mouseup', function() {
//       console.log('mouseup');
//       cell.removeEventListener('mouseup');
//     });
//   });
// }

// $('#synth').on('mousedown','#synth',function(){
//     alert('mousedown');
// });



// var socket = io();
// socket.on('synth', function( data ) {
//   synthSequencer.matrix.set.all(data);
//   //console.log(data);
// });

// function synthEmit(){
//   socket.emit('synth', synthSequencer.matrix.pattern);
// }

// // trigger on every cell release
// for(let cell of $('#synth div').children())
// {
//   cell.addEventListener('mouseup', synthEmit);
//   cell.addEventListener('touchend', synthEmit);
// }

// // trigger even when mouse up is off the grid
// $(document).on('mouseup', synthEmit);
