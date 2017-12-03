//var socket = io();


function synthEmit(){
  socket.emit('synth', 
  { room: document.getElementById('room').value,
  	pattern: synthSequencer.matrix.pattern});
}

// trigger on every cell release
for(let cell of $('#synth div').children())
{
  cell.addEventListener('mouseup', synthEmit);
  cell.addEventListener('touchend', synthEmit);
}

// trigger even when mouse up is off the grid
$(document).on('mouseup', synthEmit);

socket.on('synth', function( data ) {
  synthSequencer.matrix.set.all(data.pattern);
  //console.log(data);
});