/* ------------ Synth ------------ */
var volSlider = new Nexus.Slider("#synth-vol");
var delay = new Nexus.Slider("#echo");

var synth = new Tone.PolySynth(6, Tone.Synth, {
			"oscillator" : {
				"partials" : [8, 2, 8, 4],
			   }
		  });

var volume = new Tone.Volume(10);
var delayGen = new Tone.FeedbackDelay(0.5,0.2);
delayGen.wet.value = 0;

synth.chain( delayGen, volume, Tone.Master );

delay.min = 0;
delay.max = 0.7;
delay.value = 0;

delay.on('change',function(value) {
	delayGen.wet.value = value;
})


volSlider.min = 0;
volSlider.max = 15;
volSlider.value = 10;

volSlider.on('change',function(vol) {
	volume.volume.rampTo(vol);
})

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
