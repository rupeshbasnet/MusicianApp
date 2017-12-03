//send tempo over socket
//var socket = io();

function tempoEmit(){
  socket.emit('tempo', 
  { room: document.getElementById('room').value,
  	value: slider.value});
}

// for Desktop, hacky
$('svg')[0].addEventListener('mousemove', function(e){
  if(e.buttons == 1)
    window.addEventListener('mousemove', tempoEmit, { once: true });
});

// Mobile
$('svg')[0].addEventListener('touchmove', tempoEmit);

socket.on('tempo', function( data ) {
  slider.value = parseInt(data.value);
  //console.log(data);
});