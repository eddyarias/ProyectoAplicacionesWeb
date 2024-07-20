const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.registerUser);
// Ruta para obtener todos los usuarios
router.get('/users', userController.getUsers);
// Ruta para obtener un usuario por ID
router.get('/user/:id', userController.getUser);
// Ruta para eliminar un usuario por ID
router.delete('/user/:id', userController.deleteUser);
// Ruta para actualizar un usuario por ID
router.put('/user/:id', userController.updateUser);

module.exports = router;
