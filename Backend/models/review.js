const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },

    user_id: {
        type: Number,
        required: true
    },
    
    producto_id: {
        type: Number,
        required: true,
        unique: true
    },

    comentario: {
        type: String,
        trim: true
    },

    rating: {
        type: Number,
        required: true
    }
})

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;