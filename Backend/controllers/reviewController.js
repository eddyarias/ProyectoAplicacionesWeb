const Game = require("../models/game");
const Review = require("../models/review");
const decodeURI = require('querystring').unescape;

async function updateRatingGame(gameId){
    try {
        const reviews = await Review.find({producto_id: gameId});
        const tatalRating = reviews.reduce((sum, review) => sum + review.rating,0);
        const averageRating = (reviews.length>0)? tatalRating/reviews.length: 0;

        const updateRatingGame = await Game.findByIdAndUpdate(gameId, {rating: averageRating}, {new: true});   
        return updateRatingGame;
    } catch (error) {
        throw new Error('Error al actualizar el rating del juego: ' + error.message);
    }
}

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

    
    // Método para obtener todas las reseñas de un juego por nombre
        getGameReviewsByName: async function (req, res) {
            try {
                let gameName = decodeURI(req.params.nombre); // Decodificar el nombre del juego
                if (!gameName) return res.status(404).send({ message: 'El nombre del juego es requerido' });
        
                // Usar RegExp para una búsqueda que permita coincidencias parciales y sea insensible a mayúsculas y minúsculas
                const game = await Game.findOne({ nombre: new RegExp(gameName, 'i') });
                if (!game) return res.status(404).send({ message: 'El juego no existe' });
        
                // Obtener las reseñas utilizando el ID del juego encontrado
                const reviews = await Review.find({ producto_id: game._id }).sort().exec();
                if (reviews.length === 0) return res.status(404).send({ message: 'No hay reseñas' });
        
                return res.status(200).send({ reviews });
            } catch (error) {
                return res.status(500).send({ message: 'Error al devolver los datos', error: error.message });
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

            //Actualizar el rating del juego
            let ratingGame = await updateRatingGame(review.producto_id);
            if(!ratingGame){
                return res.status(404).send({mensaje: 'No se actualizo el rating del juego'})  
            }

            return res.status(200).send({review: reviewStored});
        } catch (error) {
            return res.status(500).send({ message: 'Error al guardar la review', error: error.message });
        }    
    },

    //Actualizar una review por ID
    updateReview: async function (req,res) {
        try {
            let review_id = req.params.id;
            let params = req.body;

            let reviewUpdated = await Review.findByIdAndUpdate(review_id, params);
            if (!reviewUpdated) return res.status(404).send({ message: 'La review no se puede actualizar' });

            //Actualizar el rating del juego
            let ratingGame =  await updateRatingGame(reviewUpdated.producto_id);
            if(!ratingGame){
                return res.status(404).send({mensaje: 'No se actualizo el rating del juego'})  
            }

            return res.status(200).send({ review: reviewUpdated });
        } catch (error) {
            return res.status(500).send({ message: 'Error al actualizar la reseña', error: error.message });
        }
    },


    deleteReview: async function(req, res){
        try {
            let review_id = req.params.id;
            let reviewRemoved = await Review.findByIdAndDelete(review_id);
            if (!reviewRemoved) return res.status(404).send({ message: 'El juego no se puede eliminar' });


            //Actualizar el rating del juego
            let ratingGame =  await updateRatingGame(reviewRemoved.producto_id);
            if(!ratingGame){
                return res.status(404).send({mensaje: 'No se actualizo el rating del juego'})  
            }

            return res.status(200).send({ review: reviewRemoved });
        } catch (error) {
            return res.status(500).send({ message: 'Error al eliminar el juego', error: error.message })
        }
    }
}




module.exports = controller;