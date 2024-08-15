var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userRoutes = require('./routes/usuario.routes');
var gameRoutes = require('./routes/game.router');
var reviewRoutes = require('./routes/review.router')
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/',userRoutes);

//rutas del juego
app.use('/',gameRoutes);

//rutas de las reseñas
app.use ('/',reviewRoutes);


// Configurar el middleware para servir archivos estáticos desde la carpeta 'juegos' dentro de 'uploads'
app.use('/uploads/games', express.static(path.join(__dirname, 'uploads', 'games')));

// Configurar el middleware para servir archivos estáticos desde la carpeta 'usuarios' dentro de 'uploads'
app.use('/uploads/users', express.static(path.join(__dirname, 'uploads', 'users')));

//app.use('/api/users', userRoutes);

module.exports = app;
