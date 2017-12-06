// Creating a single socket variable for this whole application to run.
// In order to implement rooms we need one variable socket.

// When user clicks join room emit a socket of event "room.join" with room and username
document.getElementById('join_room').addEventListener('click', (e) => {
	var userName = document.getElementById('username').innerHTML;
	console.log(userName);
	socket.emit('room.join', 
	{	room: document.getElementById('room').value,
		name: userName});
});

var addLi = (message) => {
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	document.getElementById('list').appendChild(li);
};

// When a new user signs in the room prompt it to everyone
socket.on('event', addLi);
