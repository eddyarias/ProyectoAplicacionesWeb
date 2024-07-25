const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js');

// Ruta para obtener un juego
router.get('/get-juego/:id', gameController.getGame);



module.exports = router;