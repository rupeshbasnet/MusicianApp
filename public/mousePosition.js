var userName = document.getElementById('username').innerHTML;
$(document).on('mousemove', (event) => {
  socket.emit('mouse.activity', {
    room: document.getElementById('room').value,
    xVal: event.pageX,
    yVal: event.pageY,
    name: userName
  });
});

socket.on('all.mouse.activity', (data) => {
  var color = getRandomColor();
  if ($('.pointer[session_id="' + data.session_id + '"]').length <= 0) {
    $('body').append('<div class = "pointer" style="z-index: 4; position: absolute; width: 10px; height: 10px; background: '+ color + ';" session_id= "' + data.session_id + '"><br><p style = "color: #b3b3b3;">'+ data.coords.name +'</p></div>')
  }
  var $pointer = $('.pointer[session_id="' + data.session_id + '"]');
  $pointer.css('left', data.coords.xVal);
  $pointer.css('top', data.coords.yVal);
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}