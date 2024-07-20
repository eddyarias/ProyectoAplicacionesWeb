const User = require('../models/usuario');

var controller = {
    // Método para registrar un nuevo usuario
    registerUser: async function (req, res) {
        try {
            var params = req.body;
            var user = new User();
            user.id = params.id;
            user.nombre = params.nombre;
            user.email = params.email;
            user.password = params.password;

            // Verifica si el email ya existe
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                return res.status(409).send({ message: 'El correo electrónico ya está registrado' });
            }

            var userStored = await user.save();
            return res.status(201).send({ message: 'Usuario registrado exitosamente', user: userStored });
        } catch (error) {
            return res.status(500).send({ message: 'Error al registrar el usuario', error: error.message });
        }
    },
    // Método para obtener todos los usuarios
    getUsers: async function (req, res) {
        try {
            const users = await User.find({}).sort({ nombre: 1 }).exec();
            if (users.length === 0) {
                return res.status(404).send({ message: 'No hay usuarios registrados' });
            }
            return res.status(200).send({ users });
        } catch (error) {
            return res.status(500).send({ message: 'Error al devolver los datos', error: error.message });
        }        
    },
    // Método para obtener un usuario por ID
    getUser: async function (req, res) {
        try {
            var userId = req.params.id;
            if (!userId) return res.status(400).send({ message: "El ID del usuario es requerido" });
            var user = await User.findOne({ id: userId });
            if (!user) return res.status(404).send({ message: "Usuario no encontrado" });
            return res.status(200).send({ user });
        } catch (error) {
            return res.status(500).send({ message: "Error al devolver el usuario", error: error.message });
        }        
    },
    // Método para eliminar un usuario por ID
    deleteUser: async function (req, res) {
        try {
            var userId = req.params.id;
            if (!userId) return res.status(400).send({ message: "El ID del usuario es requerido" });
            var userRemoved = await User.findOneAndDelete({ id: userId });
            if (!userRemoved) return res.status(404).send({ message: "Usuario no encontrado" });
            return res.status(200).send({ message: 'Usuario eliminado exitosamente', user: userRemoved });
        } catch (error) {
            return res.status(500).send({ message: "Error al eliminar el usuario", error: error.message });
        }
    },
    // Método para actualizar un usuario por ID
    updateUser: async function (req, res) {
        try {
            var userId = req.params.id;
            if (!userId) return res.status(400).send({ message: "El ID del usuario es requerido" });
            var userUpdated = await User.findOneAndUpdate({ id: userId }, req.body, { new: true });
            if (!userUpdated) return res.status(404).send({ message: "Usuario no encontrado" });
            return res.status(200).send({ message: 'Usuario actualizado exitosamente', user: userUpdated });
        } catch (error) {
            return res.status(500).send({ message: "Error al actualizar el usuario", error: error.message });
        }
    }
};

module.exports = controller;
