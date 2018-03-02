var audio_context;
var recorder;

// test recording of oscillator
var ac = new AudioContext();
var osc = ac.createOscillator();
var dest = ac.createMediaStreamDestination();

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  recorder = new Recorder(dest.stream);
  osc.connect(dest);
}

function startRecording() {
  // osc.start(0);
  recorder && recorder.record();

}

function stopRecording() {
  // osc.stop(0);
  recorder && recorder.stop();
  createDownloadLink();
  recorder.clear();
}

function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);
    var li = document.createElement('li');

    var au = document.createElement('audio');
    var br = document.createElement('br');
    var hf = document.createElement('a');

    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + '.wav';
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(br);
    li.appendChild(hf);
    recordingslist.appendChild(li);
  });
}

window.onload = function init() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      audio_context = new AudioContext;
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    // navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    // });
    recorder = new Recorder(Tone.Master.output);
  };
