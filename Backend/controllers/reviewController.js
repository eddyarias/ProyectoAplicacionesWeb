const Review = require("../models/review");

let controller = {
    //Metodo para obtener todas las resenias
    getReviews: async function (req,res) {
        try {
            const reviews = await Review.find({}).sort().exec();
            if(reviews.length === 0) return res.status(404).send({message:'No hay reseñas'});
            return res.status(200).send({reviews});
        } catch (error) {
            return res.status(500).send({message: 'Error al devolver los datos', error: error.message })
        }
    },
    //Metodo para obtener todas las resenias de un juego
    getGameReviews: async function (req,res) {
        try {
            let gameId = req.params.id;
            if(!gameId) return res.status(404).send({message: 'El id del juego es requerido'})
            const reviews = await Review.find({producto_id: gameId}).sort().exec();
            if(reviews === 0) return res.status(404).send({message: 'No hay reseñas'});
            return res.status(200).send({reviews});
        } catch (error) {
            return res.status(500).send({message: 'Error al devolver los datos', error: error.message});
            
        }
    },

    //Crear una review 
    saveReview: async function (req,res) {
        try {
            let review = new Review();
            let params = req.body;

            review.producto_id = params.producto_id;
            review.comentario = params.comentario;
            review.rating = params.rating;
            review.user_id = params.user_id;

            let reviewStored = await review.save();

            if(!reviewStored){
                return res.status(404).send({mensaje: 'No se guardó la reseña'})  
            }
            return res.status(200).send({review: reviewStored});
        } catch (error) {
            return res.status(500).send({ message: 'Error al guardar el juego', error: error.message });
        }    
    },

    //Actualizar una review por ID
    updateReview: async function (req,res) {
        try {
            let review_id = req.params.id;
            let params = req.body;

            let reviewUpdated = await Review.findByIdAndUpdate(review_id, params);
            if (!reviewUpdated) return res.status(404).send({ message: 'La review no se puede actualizar' });
            return res.status(200).send({ review: reviewUpdated });
        } catch (error) {
            return res.status(500).send({ message: 'Error al actualizar el juego', error: error.message });
        }
    },


    deleteReview: async function(req, res){
        try {
            let review_id = req.params.id;
            let reviewRemoved = await Review.findByIdAndDelete(review_id);
            if (!reviewRemoved) return res.status(404).send({ message: 'El juego no se puede eliminar' });
            return res.status(200).send({ review: reviewRemoved });
        } catch (error) {
            return res.status(500).send({ message: 'Error al eliminar el juego', error: error.message })
        }
    }
}

module.exports = controller;