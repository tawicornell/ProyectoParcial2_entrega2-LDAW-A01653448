let express = require('express');
let app = express();
let webRoutes = require('./routes/web');
let appRoutes = require('./routes/app');
let webSocket = require('./websocket/main');
let authMiddleware = require('./middlewares/AuthMiddleware');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let sessionStore = new session.MemoryStore;
let passport = require('passport');
const bodyparser = require('body-parser');



//socket.io
var server = require('http').createServer(app);
io = require('socket.io').listen(server),
io.origins('*:*') 

/**
 * Configurations
 */

let appConfig = require('./configs/app');

// Configuraciones para el view engine
let exphbs = require('express-handlebars');
// Imports a set of helpers for handlebars
// https://github.com/helpers/handlebars-helpers
let hbshelpers = require("handlebars-helpers");
let multihelpers = hbshelpers();

//--------------------------------------
const extNameHbs = 'hbs';
let hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

// Configuraciones para el bodyparser
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true}));




// Configuraciones de las sesiones
app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: appConfig.secret
}));
app.use(flash());

//------------------------------------------

// Configuraciones de passport
require('./configs/passport');

app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes AÑADE AUTOMATICAMENTE app a las rutas
 */

app.use('/', webRoutes);
app.use('/app', authMiddleware.isAuth, appRoutes);


//--------------------------
/**
 * App Init
 */
/*
app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
*/
//socket.io


var messages = [{

  id: 1,

  text: "Hola soy un mensaje",

  author: "Carlos Azaustre"

}];
app.use(express.static('public'));

app.get('/hello', function(req, res) {

  res.status(200).send("Hello World!");

});

io.on('connection', function(socket) {
  let n = Math.random();
  console.log('Alguien se ha conectado con Sockets'+n.toString());

  socket.emit('messages', messages);

  socket.on('new-message', function(data) {

    messages.push(data);

    io.sockets.emit('messages', messages);

  });



});

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {

    let datos = JSON.stringify(data);
    console.log(datos+" desde el server");

  });
});



server.listen(8080, function() {

  console.log("Servidor corriendo en http://localhost:8080");

});