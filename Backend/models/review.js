const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    
    producto_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;