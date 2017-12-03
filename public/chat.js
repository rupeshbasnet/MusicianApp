var socket = io();

document.addEventListener("DOMContentLoaded", (e) => {
    socket.emit('room.join');
});

var addLi = (message) => {
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	document.getElementById('list').appendChild(li);
};

socket.on('event', addLi);