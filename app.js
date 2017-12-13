const bodyParser = require('body-parser');
const express = require('express');
const models = require('./models');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('./middlewares/authentication');

const PORT = process.env.PORT || 8000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession(({ secret: 'apple-tree', resave: false, saveUninitialized: true} )));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(express.static('./public'));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);


// Load up all of the controllers
const controllers = require('./controllers');
app.use(controllers)

io.on('connection', function(socket){
	// List for the room.join event and from there join a room
	// We will get the room name "room" passed in from the client
	socket.on('room.join', (msg) => {
		// Socket will have the keys of everyroom that it is in
		// Filter out the rooms that are not the socket
		Object.keys(socket.rooms).filter((r) => r != socket.id)
		.forEach((r) => socket.leave(r));  // Leave that room since we want the user to be in only one room
		// settimeout to 0 so that it gets in the next event loop
		setTimeout(() => {
			// Take the "room" and join it
			socket.join(msg.room);
			// Emit a socket saying we joined the room
			socket.emit('event', 'Joined Colaboration ' + msg.room);
			// We will broadcast to the room - broadcast will send it to everyone but yourself
			socket.broadcast.to(msg.room).emit('event', msg.name + ' joined ' + msg.room);
		}, 0);
	});

	// On user mouse activity
	socket.on('mouse.activity', (e) => {
		socket.broadcast.to(e.room).emit('all.mouse.activity', {session_id: socket.id,
																coords: e});
	})

	// Listen for the event and if there is an event broadcast it to everyone else.
	socket.on('send.message', (e) => {
		// We need to broadcast this to everyone including the client
		io.in(e.room).emit('receive.message', e.name + ' : ' + e.message);
	});

	socket.on('tempo', (msg) => {
		// If we get tempo event we broadcast it to everyone in that room except the sender
		socket.broadcast.to(msg.room).emit('tempo', msg.val);
	});

  socket.on('play', (msg) => {
		// If we get tempo event we broadcast it to everyone in that room except the sender
		socket.broadcast.to(msg.room).emit('play', msg.state);
	});

	socket.on('synth', (msg) => {
		// If we get synth event we broadcast it to everyone in that room except the sender
		socket.broadcast.to(msg.room).emit('synth', msg.pattern);
	});

	socket.on('drums', (msg) => {
		// If we get drums event we broadcast it to everyone in that room except the sender
		socket.broadcast.to(msg.room).emit('drums', msg.pattern);
	});

});

// io.on('connection', function(socket){
//   socket.on('tempo', function(msg){
// 		//console.log(msg);
// 		io.emit('tempo', msg);
// 	});
// 	socket.on('synth', function(msg){
// 		//console.log(msg);
// 		io.emit('synth', msg);
// 	});
//   socket.on('drums', function(msg){
// 		//console.log(msg);
// 		io.emit('drums', msg);
// 	});
// });

// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
 models.sequelize.sync({force: false})
   .then(() => {
     http.listen(PORT, () => {

		});
   });
