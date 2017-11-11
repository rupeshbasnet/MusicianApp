seqs = [];

var isRunning = false;

function start_stop(event) {
  for(seq of seqs) {
    if(!isRunning)
      seq.start();
    else {
      seq.stop();
      seq.stepper.value = 15;

    }
  }

  isRunning = !isRunning;
}

document.getElementById('start_stop_btn').addEventListener('click', start_stop);
