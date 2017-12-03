//send tempo over socket
var socket = io();
socket.on('tempo', function( data ) {
  slider.value = parseInt(data);
  //console.log(data);
});

function tempoEmit(){
  socket.emit('tempo', slider.value);
}

// for Desktop, hacky
$('svg')[0].addEventListener('mousemove', function(e){
  if(e.buttons == 1)
    window.addEventListener('mousemove', tempoEmit, { once: true });
});

// Mobile
$('svg')[0].addEventListener('touchmove', tempoEmit);