seqs = [];

var slider = new Nexus.Slider('#slider', {
    'size': [600, 20],
    'mode': 'relative', // 'relative' or 'absolute'
    'min': 60,
    'max': 200,
    'step': 1,
    'value': 0
})

// Global Loop
var loop = new Tone.Sequence((time, col) => {
    //Loop Drum Sequencer
    loopDrum(time, col);

    //Loop Synth Sequencer
    loopSynth(time, col);
    seq.stepper.value = col;
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

Tone.Transport.start();

var number = new Nexus.Number('#tempodisplay')
Tone.Transport.bpm.value = slider.value;
number.link(slider);

slider.on('change', function(v) {
    console.log(v);
    Tone.Transport.bpm.value = parseFloat(v);
})

var isRunning = false;

function start_stop(event) {
    for (seq of seqs) {
        if (!isRunning) {
            //seq.start();
            loop.start();
            seq.start();
            seq.stepper.value = 0;
        } else {
            //seq.stop();
            loop.stop();
            seq.stop();
            seq.stepper.value = 0;
            //seq.stepper.value = 15;
        }
    }

    isRunning = !isRunning;
}

document.getElementById('start_stop_btn').addEventListener('click', start_stop);