

// drumSequencer.on('change',function(v) {
//     var socket = io();
//     socket.emit('beat2', drumSequencer.matrix.pattern);
//     //console.log(sequencer.matrix.pattern);
//     socket.on('beat2', function( data ) {
//       drumSequencer.matrix.set.all(data);
//       console.log(data);
//     });
// });

// var socket = io();
// socket.on('drums', function( data ) {
//   drumSequencer.matrix.set.all(data);
// });

// function drumsEmit() {
//   socket.emit('drums', drumSequencer.matrix.pattern);
// }

// for(let cell of $('#drums div').children())
// {
//   cell.addEventListener('mouseup', drumsEmit);
//   cell.addEventListener('touchend', drumsEmit);
// }

// $(document).on('mouseup', drumsEmit);
