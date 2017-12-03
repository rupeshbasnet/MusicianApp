var socket = io();

document.getElementById('join_room').addEventListener('click', (e) => {
	socket.emit('room.join', document.getElementById('room').value);
});

// document.getElementById('say_hello').addEventListener('click', (e) => {
// 	socket.emit('event', {

// 	});
// })

var addLi = (message) => {
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	document.getElementById('list').appendChild(li);
};

socket.on('event', addLi);