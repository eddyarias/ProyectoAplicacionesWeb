const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        //required: true,
        //trim: true
    },
    email: {
        type: String,
        //required: true,
        //unique: true,
        // trim: trues
    },
    password: {
        type: String,
        //required: true,
        // minlength: 6
    },

    imagen: {
        type: String
    }
});


const User = mongoose.model('usuarios', userSchema);

module.exports = User;
