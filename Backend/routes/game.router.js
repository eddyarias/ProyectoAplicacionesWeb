const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js');


// Ruta para obtener todos los juegos
router.get('/get-juegos/', gameController.getGames)

// Ruta para obtener un juego
router.get('/get-juego/:id', gameController.getGame);

// Ruta para obtenere imagen del juego
router.get('/get-imagen/:imagen', gameController.getImagen);

// Ruta para obtener juegos segun su plataforma y genero
router.get('/get-juegos-por-filtros', gameController.getGamesByFilters);

//
router.post('/save-juego', gameController.saveGame)



module.exports = router;