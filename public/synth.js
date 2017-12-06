/* ------------ Synth ------------ */


var synth = new Tone.PolySynth(6, Tone.Synth, {
			"oscillator" : {
				"partials" : [8, 2, 8, 4],
			}
		},{
        "volume": "10",
    }).toMaster();


// use this as part of volume fader
// var vol = new Tone.Volume(0);
// synth.chain(vol, Tone.Master);

var synthSequencer = new Nexus.Sequencer('#synth', {
    'size': [704, 352],
    'mode': 'toggle',
    'rows': 8,
    'columns': 16
})

synthSequencer.colorize("accent", "black");

var synthNotes = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3"];


document.getElementById('join_room').addEventListener('click', (e) => {
	socket.emit('room.join', document.getElementById('room').value);
});
