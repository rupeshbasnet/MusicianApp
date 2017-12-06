// Creating a single socket variable for this whole application to run.
// In order to implement rooms we need one variable socket.

// When user clicks join room emit a socket of event "room.join" with room and username
document.getElementById('join_room').addEventListener('click', (e) => {
	var userName = document.getElementById('username').innerHTML;
	socket.emit('room.join', 
	{	room: document.getElementById('room').value,
		name: userName,
	});
});

// When a user sends the message emit send.message
document.getElementById('send_message').addEventListener('click', (e) => {
	var userName = document.getElementById('username').innerHTML;
	var message = document.getElementById('chat_message').value;
	//console.log(message);
	socket.emit('send.message', 
	{	room: document.getElementById('room').value,
		name: userName,
		message: message});
});


var addli = (message) => {
	var li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	document.getElementById('list').appendChild(li);
	// Scroll to the end
	var objDiv = $("#chatbox").get(0);
	objDiv.scrollTop = objDiv.scrollHeight;
};

// When a new user signs in the room prompt it to everyone
socket.on('event', addli);

// On Receive message call add li
socket.on('receive.message', addli);
