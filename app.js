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
	// We will get the room name passed in from the client
	// socket.on('room.join', (room) => {
	// 	// Log all the rooms
	// 	console.log(socket.rooms);
	// 	// Socket will have the keys of everyroom that it is in
	// 	Object.keys(socket.rooms).filter((r) => r != socket.id)
	// 	.forEach((r) => socket.leave(r));

	// 	setTimeout(() => {
	// 		socket.join(room);
	// 		socket.emit('event', 'Joined room' + room);
	// 		socket.broadcast.to(room).emit('event', 'Someone joined room ' + room);
	// 	}, 0);
	// });

	// socket.on('event', (e) => {
	// 	socket.broadcast.to(e.room).emit('event', e.name + ' says hello!');
	// });
	
	socket.on('synth', function(msg){
		//console.log(msg);
		io.emit('synth', msg);
	});
  
	socket.on('drums', function(msg){
		//console.log(msg);
		io.emit('drums', msg);
	});

  	socket.on('tempo', function(msg){
		//console.log(msg);
		io.emit('tempo', msg);
	});
});


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
 models.sequelize.sync({force: false})
   .then(() => {
     http.listen(PORT, () => {

		});
   });


