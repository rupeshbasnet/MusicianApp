// Global Loop
Nexus.context = Tone.context
Nexus.colors.accent = "#0be"
Nexus.colors.fill = "#444449"
Nexus.colors.dark = "white"
var slider = new Nexus.Slider('#tempo-slider', {
    'size': [350, 20],
    'mode': 'relative', // 'relative' or 'absolute'
    'min': 60,
    'max': 200,
    'step': 1,
    'value': 120
})

var loop = new Tone.Sequence((time, col) => {

    //Loop Drum Sequencer
    loopDrum(time, col);
    //Loop Synth Sequencer
    loopSynth(time, col);
    Tone.Draw.schedule(function(){
        //the callback synced to the animation frame at the given time
        $("#S"+col).css("opacity", 1).animate({"opacity" : 0}, 300)
        $("#D"+col).css("opacity", 1).animate({"opacity" : 0}, 300)

    }, time);

}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

Tone.Transport.start();

var number = new Nexus.Number('#tempodisplay')
Tone.Transport.bpm.value = slider.value;
number.link(slider);


slider.on('change', function(v) {

    Tone.Transport.bpm.value = parseFloat(v);
    delayGenSynth.delayTime.value = 1/(slider.value * synthDelayCoefficient / 60); // time synth delay to global bpm
    delayGenDrums.delayTime.value = 1/(slider.value * drumDelayCoefficient / 60); // time drum delay to global bpm
    //tempoEmit();
});

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope',{
  'size': [350,140]
})

oscilloscope.colorize("fill", "black");

function loopDrum(time, col) {
    var column = drumSequencer.matrix.column(col);
    for (var i = 0; i < 4; i++) {
        if (column[i]) {
            var vel = Math.random() * 0.5 + 0.5;
            drums.get(notes[i]).start(time, 0, "16n", 0, vel);
            drumSequencer.stepper.value = col;
        }
    }
}

function loopSynth(time, col) {
    var column = synthSequencer.matrix.column(col);
    for (var i = 0; i < 8; i++) {
        if (column[i]) {
            var vel = Math.random() * 0.5 + 0.5;
            synth.triggerAttackRelease(curScale[i], '16n');
            synthSequencer.stepper.value = col;
        }
    }
}

var playbutton = new Nexus.TextButton('#button', {
    'size': [150, 50],
    'state': false,
    'text': 'Play',
    'alternate': false,
    'alternateText': 'Stop'
})

var recordbutton = new Nexus.TextButton('#record', {
    'size': [150, 50],
    'state': false,
    'text': 'Record',
    'alternate': false,
    'alternateText': 'Stop Recording'
})

recordbutton.on('change', function(v) {
    recordbutton.alternateText = 'Stop';
    if (v) {
        startRecording();
    } else {
        stopRecording();
    }
})



playbutton.on('change', function(v) {
    console.log(v);
    playbutton.alternateText = 'Stop';
    if (v) {
        loop.start();
        oscilloscope.connect( Tone.Master );
        spectrogram.connect( Tone.Master );
    } else {
        loop.stop();
        oscilloscope.disconnect( Tone.Master );
        spectrogram.disconnect ( Tone.Master );

    }
});

$(function(){
  let globalComponents = $('.global > div > div');
  let noComponents = globalComponents.length;

  if(noComponents == 2){
    globalComponents.css('min-width', '50%');
  }
  else{
    let rowLength = parseInt($('.global').css('width'));
    globalComponents.css('min-width', ((1/noComponents)*rowLength - noComponents));
  }


});
