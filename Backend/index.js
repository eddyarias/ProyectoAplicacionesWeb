var mongoose = require('mongoose');
var port = '3600';
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
var app = require('./app');

mongoose.connect('mongodb://localhost:27017/tiendavideojuegos')
    .then(() => {
        console.log("Conexión exitosa a la BDD");
        app.listen(port, () => {
            console.log("Servidor corriendo en localhost:3600");
        });
    })
    .catch(err => console.log(err));
