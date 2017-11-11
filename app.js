const bodyParser = require('body-parser');
const express = require('express');
const models = require('./models');
//const tone = require('tone');

const PORT = process.env.PORT || 8000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
	socket.on('beat1', function(msg){
		//console.log(msg);
		io.emit('beat1', msg);
	});
	socket.on('beat2', function(msg){
		//console.log(msg);
		io.emit('beat2', msg);
	});
});


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({force: true})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  });

// http.listen(PORT, () => {
//
// });
