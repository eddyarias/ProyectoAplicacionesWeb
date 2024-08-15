const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');

//Ruta para obtener todas las resenias
router.get('/get-reviews/', reviewController.getReviews);

//Ruta para obtener todas las resenias de un juego
router.get('/get-game-reviews/:id', reviewController.getGameReviews);

// Ruta para obtener todas las reseñas de un juego por nombre
router.get('/get-game-reviews-by-name/:nombre', reviewController.getGameReviewsByName);

// Ruta para guardar una review
router.post('/save-review', reviewController.saveReview);

// Ruta para actualizar una review
router.put('/update-review/:id', reviewController.updateReview);

// Ruta para borrar una review
router.delete('/delete-review/:id', reviewController.deleteReview);

module.exports = router;