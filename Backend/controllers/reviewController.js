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
    }
}

module.exports = controller;