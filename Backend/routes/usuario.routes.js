const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController.js');

// Ruta para registrar un nuevo usuario
router.post('/usuarioRegistrar', userController.registerUser);
// Ruta para obtener todos los usuarios
router.get('/usuarios', userController.getUsers);
// Ruta para obtener un usuario por ID
router.get('/usuarioGet/:id', userController.getUser);
// Ruta para eliminar un usuario por ID
router.delete('/usuarioEliminar/:id', userController.deleteUser);
// Ruta para actualizar un usuario por ID
router.put('/usuarioActualizar/:id', userController.updateUser);

module.exports = router;
