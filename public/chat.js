// Creating a single socket variable for this whole application to run.
// In order to implement rooms we need one variable socket.
var socket = io();

var addLi = (message) => {
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	document.getElementById('list').appendChild(li);
};

// When a new user signs in the room prompt it to everyone
socket.on('event', addLi);
