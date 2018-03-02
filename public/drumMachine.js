
output = [];

var volSliderDrums = new Nexus.Slider("#drum-vol");
var delayDrums = new Nexus.Slider("#echo-drums");
var drumDelayTime = new Nexus.Select('#drum-delay-time',{
  'size': [100,30],
  'options': ['1/4','1/8','1/8 .','1/16']
});

var filterSliderDrums = new Nexus.Slider("#drums-filter");


var drums = new Tone.Players({
    "Hihat": "/vendor/Samples/hihat.wav",
    "Hat": "/vendor/Samples/hat.wav",
    "Sistersnare": "/vendor/Samples/sistersnare.wav",
    "Kick": "/vendor/Samples/kick.wav"
}, {
    "volume": "2",
    "fadeOut": "64n",
})

var volumeDrums = new Tone.Volume(0);
var delayGenDrums = new Tone.FeedbackDelay(0.5,0.2);
delayGenDrums.wet.value = 0;
var filterDrums = new Tone.Filter(7000, "lowpass", -24);

drums.chain( delayGenDrums, filterDrums, volumeDrums, Tone.Master );

delayDrums.min = 0;
delayDrums.max = 0.7;
delayDrums.value = 0;

delayDrums.on('change',function(value) {
    delayGenDrums.wet.value = value;
})

// set delay time based on dropdown, and tempo slider
var drumDelayCoefficient = 1;
drumDelayTime.on('change',function(v) {
	switch (v.value) {
    case "1/4":
        drumDelayCoefficient = 1;
        break;
    case "1/8":
        drumDelayCoefficient = 2;
        break;
		case "1/8 .":
		    drumDelayCoefficient = 1+(1/3);
		    break;
		case "1/16":
		    drumDelayCoefficient = 4;
		    break;
	}

  delayGenDrums.delayTime.value = 1/(slider.value * drumDelayCoefficient / 60);
	console.log( 1/(slider.value * drumDelayCoefficient / 60) );
});



filterSliderDrums.min = 50;
filterSliderDrums.max = 10000;
filterSliderDrums.value = 7000;

filterSliderDrums.on('change',function(value) {
    filterDrums.frequency.value = value;
})

volSliderDrums.min = -10;
volSliderDrums.max = 10;
volSliderDrums.value = 0;

volSliderDrums.on('change',function(vol) {
    volumeDrums.volume.value = vol;
})

var drumSequencer = new Nexus.Sequencer('#drums', {
    'size': [704, 176],
    'mode': 'toggle',
    'rows': 4,
    'columns': 16
})

var notes = ["Hihat", "Hat", "Sistersnare", "Kick" ];

drumSequencer.colorize("accent", "#0be");
