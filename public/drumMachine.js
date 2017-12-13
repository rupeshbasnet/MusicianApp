
output = [];

var drumSequencer = new Nexus.Sequencer('#drums', {
    'size': [704, 176],
    'mode': 'toggle',
    'rows': 4,
    'columns': 16
})

var drums = new Tone.Players({
    "Hihat": "/vendor/Samples/hihat.wav",
    "Hat": "/vendor/Samples/hat.wav",
    "Sistersnare": "/vendor/Samples/sistersnare.wav",
    "Kick": "/vendor/Samples/kick.wav"
}, {
    "volume": "2",
    "fadeOut": "64n",
}).toMaster();

var notes = ["Hihat", "Hat", "Sistersnare", "Kick" ];

drumSequencer.colorize("accent", "#0be");
