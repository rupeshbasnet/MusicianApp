/* ------------ Synth ------------ */
var volSlider = new Nexus.Slider("#synth-vol");
var delay = new Nexus.Slider("#echo");
var scaleselect = new Nexus.Select('#scale-select', {
  'size': [100,30],
  'options': ['Major','Minor']
});

var synthDelayTime = new Nexus.Select('#synth-delay-time',{
  'size': [100,30],
  'options': ['1/4','1/8','1/8 .','1/16']
});


var filterSlider = new Nexus.Slider("#synth-filter");
var phaserSlider = new Nexus.Slider("#phaser-Slider");


var synth = new Tone.PolySynth(6, Tone.Synth, {
			"oscillator" : {
				// "partials" : [8, 2, 8, 4],
				"type" : "sawtooth",
			   }
		  });

var volume = new Tone.Volume(0);
var delayGenSynth = new Tone.FeedbackDelay(0.500,0.2);
delayGenSynth.wet.value = 0;

var filter = new Tone.Filter(2000, "lowpass", -24);
var phaser = new Tone.Phaser(0, 5, 1000);

synth.chain( delayGenSynth, filter, volume, phaser, Tone.Master );

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
	delayGenSynth.wet.value = value;
})

var synthMajorNotes = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3"];
var synthMinorNotes = ["C4", "Bb3", "Ab3", "G3", "F3", "Eb3", "D3", "C3"];
var curScale = synthMajorNotes;


scaleselect.on('change',function(v) {
  if (scaleselect.value == "Major")
    {
        curScale = synthMajorNotes;
    }
    else
    {
    curScale = synthMinorNotes;
    }    
})


// set delay time based on dropdown, and tempo slider
var synthDelayCoefficient = 1;
synthDelayTime.on('change',function(v) {
	switch (v.value) {
    case "1/4":
        synthDelayCoefficient = 1;
        break;
    case "1/8":
        synthDelayCoefficient = 2;
        break;
		case "1/8 .":
		    synthDelayCoefficient = 1+(1/3);
		    break;
		case "1/16":
		    synthDelayCoefficient = 4;
		    break;
	}

	delayGenSynth.delayTime.value = 1/(slider.value * synthDelayCoefficient / 60);
	console.log( 1/(slider.value * synthDelayCoefficient / 60) );
});


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


