//send tempo over socket
function tempoEmit(){
  var val = slider.value;
  socket.emit('tempo',
  { room: document.getElementById('room').value,
    val: val});
}

// Desktop
$('svg')[0].addEventListener('mousedown', function(e){
  if(e.buttons === 1)
    $(document).on('mouseup', function(){
      tempoEmit();
      $(document).off('mouseup');
    });
});

// Mobile
$('svg')[0].addEventListener('touchmove', tempoEmit);

socket.on('tempo', function( data ) {
  //console.log(parseInt(data.value));
 var valueInt = parseInt(data);
 slider.value = valueInt;

});

function playEmit() {
  socket.emit('play',
  { room: document.getElementById('room').value,
    state: playbutton.state});
}


socket.on('play', function( data ) {
    playbutton.click();
});

$('#button').click(playEmit);
