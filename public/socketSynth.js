var socket = io();
socket.on('synth', function( data ) {
  synthSequencer.matrix.set.all(data);
  //console.log(data);
});

function synthEmit(){
  socket.emit('synth', synthSequencer.matrix.pattern);
}

// trigger on every cell release
for(let cell of $('#synth div').children())
{
  cell.addEventListener('mouseup', synthEmit);
  cell.addEventListener('touchend', synthEmit);
}

// trigger even when mouse up is off the grid
$(document).on('mouseup', synthEmit);