//send tempo over socket
function tempoEmit(){
  var val = slider.value;
  socket.emit('tempo', 
  { room: document.getElementById('room').value,
    val: val});
}

// for Desktop, hacky
$('svg')[0].addEventListener('mousemove', function(e){
  if(e.buttons == 1)
    window.addEventListener('mousemove', tempoEmit, { once: true });
});

// Mobile
$('svg')[0].addEventListener('touchmove', tempoEmit);

socket.on('tempo', function( data ) {
  //console.log(parseInt(data.value));
 var valueInt = parseInt(data);
 slider.value = valueInt;
  
});
