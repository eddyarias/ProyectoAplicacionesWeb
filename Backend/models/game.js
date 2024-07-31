const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required:true,
        trim:true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio debe ser mayor o igula a cero']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock debe ser mayor o igula a cero'],
        validate:{
            validator: Number.isInteger,
            message: 'El stock debe ser un número entero'
        }

    },
    imagen: {
        type: String,
        required: true
    }
});

const Game = mongoose.model('juegos', gameSchema);

module.exports = Game;


