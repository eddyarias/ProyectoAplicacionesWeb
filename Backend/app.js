var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userRoutes = require('./routes/usuario.routes');

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

//app.use('/api/users', userRoutes);

module.exports = app;
