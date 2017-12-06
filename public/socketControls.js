const socket = io();

function synthEmit(){
  socket.emit('synth', synthSequencer.matrix.pattern);
}

function synthSetup(){
  socket.on('synth', function( data ) {
    synthSequencer.matrix.set.all(data);
  });

  // trigger on every cell release
  for(let cell of $('#synth div').children())
  {
    cell.addEventListener('mouseup', synthEmit);
    cell.addEventListener('touchend', synthEmit);
  }

  // trigger even when mouse up is off the grid
  $('#synth div').mouseleave(function(e){

    if(e.buttons === 1)
      $(document).on('mouseup', function(){
        synthEmit();
        $(document).off('mouseup');
      });

  });
}

function drumsEmit() {
  socket.emit('drums', drumSequencer.matrix.pattern);
}

function drumsSetup(){
  socket.on('drums', function( data ) {
    drumSequencer.matrix.set.all(data);
  });

  for(let cell of $('#drums div').children())
  {
    cell.addEventListener('mouseup', drumsEmit);
    cell.addEventListener('touchend', drumsEmit);
  }

  $('#drums div').mouseleave(function(e){

    if(e.buttons === 1)
      $(document).on('mouseup', function(){
        drumsEmit();
        $(document).off('mouseup');
      });

  });
}

function playEmit() {
  socket.emit('play', playbutton.state);
}

function playSetup() {
  socket.on('play', function( data ) {
    playbutton.state = data;
  });

  $('#button').click(playEmit);
}

function tempoEmit(){
  socket.emit('tempo', slider.value);
}

function tempoSetup(){

  //send tempo over socket
  socket.on('tempo', function( data ) {
    slider.value = parseInt(data);
    //console.log(data);
  });

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
}

function socketSetup(){
  if( document.getElementById('slider') )
    tempoSetup();
  if( document.getElementById('drums') )
    drumsSetup();
  if( document.getElementById('synth') )
    synthSetup();
}

$( socketSetup );
