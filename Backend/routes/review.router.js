const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');

//Ruta para obtener todas las resenias
router.get('/get-reviews/', reviewController.getReviews);

//Ruta para obtener todas las resenias de un juego
router.get('/get-game-reviews/:id', reviewController.getGameReviews);


module.exports = router;