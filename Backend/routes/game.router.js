const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js');

// Ruta para obtener todos los juegos
router.get('/get-juegos', gameController.getGames);

// Ruta para obtener un juego por ID
router.get('/get-juego/:id', gameController.getGame);

// Ruta para obtener una imagen de un juego
router.get('/get-imagen/:imagen', gameController.getImagen);

// Ruta para obtener juegos según filtros (plataforma, género)
router.get('/get-juegos-por-filtros', gameController.getGamesByFilters);

// Ruta para crear un nuevo juego
router.post('/save-juego', gameController.createGame);

// Ruta para actualizar un juego existente
router.put('/update-juego/:id', gameController.updateGame);

// Ruta para eliminar un juego
router.delete('/delete-juego/:id', gameController.deleteGame);

// Ruta para subir una imagen para un juego
router.post('/upload-image/:id', gameController.uploadImage);

module.exports = router;
