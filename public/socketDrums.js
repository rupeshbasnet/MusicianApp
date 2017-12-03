var socket = io();
socket.on('drums', function( data ) {
  drumSequencer.matrix.set.all(data);
});

function drumsEmit() {
  socket.emit('drums', drumSequencer.matrix.pattern);
}

for(let cell of $('#drums div').children())
{
  cell.addEventListener('mouseup', drumsEmit);
  cell.addEventListener('touchend', drumsEmit);
}

$(document).on('mouseup', drumsEmit);