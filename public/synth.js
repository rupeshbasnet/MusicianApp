/* ------------ Synth ------------ */
var volSlider = new Nexus.Slider("#synth-vol");
var delay = new Nexus.Slider("#echo");
var filterSlider = new Nexus.Slider("#synth-filter");
var phaserSlider = new Nexus.Slider("#phaser-Slider");


var synth = new Tone.PolySynth(6, Tone.Synth, {
			"oscillator" : {
				// "partials" : [8, 2, 8, 4],
				"type" : "sawtooth",
			   }
		  });

var volume = new Tone.Volume(0);
var delayGen = new Tone.FeedbackDelay(0.500,0.2);
delayGen.wet.value = 0;

var filter = new Tone.Filter(2000, "lowpass", -24);
var phaser = new Tone.Phaser(0, 5, 1000);

synth.chain( delayGen, filter, volume, phaser, Tone.Master );

phaserSlider.min = 0;
phaserSlider.max = 30;
phaserSlider.value = 0;

phaserSlider.on('change',function(value) {
    phaser.frequency.value = value;
})

delay.min = 0;
delay.max = 0.7;
delay.value = 0;

delay.on('change',function(value) {
	delayGen.wet.value = value;
})

delayGen.delayTime.value = 0.100;


filterSlider.min = 50;
filterSlider.max = 10000;
filterSlider.value = 2000;

filterSlider.on('change',function(value) {
	filter.frequency.value = value;
})


volSlider.min = -10;
volSlider.max = 10;
volSlider.value = 0;

volSlider.on('change',function(vol) {
	volume.volume.value = vol;
})

var oscbutton = new Nexus.TextButton('#osc-button', {
    'size': [50, 50],
    'state': false,
    'text': 'SAW',
    'alternate': false,
    'alternateText': 'SQR'
})

oscbutton.on('change', function(v) {
    console.log(v);
    oscbutton.alternateText = 'SQR';
    if (v) {
			synth.set("oscillator", {"type": "square"});
    } else {
			synth.set("oscillator", {"type": "sawtooth"});
    }
});

var synthSequencer = new Nexus.Sequencer('#synth', {
    'size': [704, 352],
    'mode': 'toggle',
    'rows': 8,
    'columns': 16
})

synthSequencer.colorize("accent", "#0be");

var synthNotes = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3"];
