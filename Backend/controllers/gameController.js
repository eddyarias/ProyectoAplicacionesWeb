const Game = require('../models/game');
let fs = require('fs');
let path = require('path');


let controller = {

    //Metodo para obtener todos los juegos
    getGames: async function(req,res){
        try {
            let games = await Game.find ({}).sort().exec()
            if(games.length === 0) return res.status(404).send({message:'No hay juegos'})
            return res.status(200).send({games})
        } catch (error) {
            return res.status(500).send({message:'Error al devolver los datos', error: error.message})
        }
    },



    //Metodo para obtener los datos del juego 
    getGame: async function (req,res){
        try {
            let gameId = req.params.id;
            if(!gameId){
                return res.status(400).send({message: 'El Id del juego es requerido'})
            }
            let game = await Game.findById(gameId);
            if(!game){
                return res.status(404).send({message: 'El juego no existe'})
            }else{
                return res.status(200).send({game})
            }
        } catch (error) {
            return res.status(500).send({ message: "Error al devolver el juego", error: error.message });
        }
    },

    //Para obtener juegos relacionados por filtros
    getFilteredGames: async function(req, res) {
        try {
            // Construir el objeto de filtros basado en los parámetros de consulta
            let filters = {};
    
            // Filtrar por plataforma si se proporciona
            if (req.query.plataforma) {
                filters.plataforma = req.query.plataforma;
            }
    
            // Filtrar por stock si se proporciona
            if (req.query.stock) {
                filters.stock = req.query.stock === 'true' ? { $gt: 0 } : { $eq: 0 };
            }
    
            // Filtrar por rango de precios si se proporciona
            if (req.query.minPrice || req.query.maxPrice) {
                filters.precio = {};
                if (req.query.minPrice) {
                    filters.precio.$gte = parseFloat(req.query.minPrice);
                }
                if (req.query.maxPrice) {
                    filters.precio.$lte = parseFloat(req.query.maxPrice);
                }
            }
    
            // Obtener los juegos según los filtros
            let games = await Game.find(filters).sort().exec();
    
            // Verificar si se encontraron juegos
            if (games.length === 0) {
                return res.status(404).send({ message: 'No se encontraron juegos que coincidan con los filtros' });
            }
    
            // Devolver la lista de juegos filtrados
            return res.status(200).send({ games });
    
        } catch (error) {
            // Manejo de errores
            return res.status(500).send({ message: 'Error al devolver los datos', error: error.message });
        }
    },    

    //Ver imagen
    getImagen: async function (req,res){
        try {
            let file = req.params.imagen;
            let path_file="./uploads/"+file;
            let exists=await fs.promises.access(path_file)
            .then(()=>true) 
            .catch(()=>false);
            
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({message:"La imagen no existe"})
            }            
        } catch (error) {
            return res.status(500).send({ message: "Error al devolver la portada del juego", error: error.message });
        }
    },

    // Crear un nuevo juego
    createGame: async function(req, res) {
        try {
            let game = new Game();
            let params = req.body;

            game.nombre= params.nombre;
            game.descripcion = params.descripcion;
            game.precio = params.precio;
            game.stock = params.stock;
            game.sku = params.sku;
            game.rating = params.rating;
            game.plataforma = params.plataforma;
            game.genero = params.genero;
            game.portada = null;

            let gameStored = await game.save();
            if (!gameStored) {
                return res.status(404).send({ message: 'No se guardó el juego' });
            }
            return res.status(201).send({ game: gameStored });
        } catch (error) {
            return res.status(500).send({ message: 'Error al guardar el juego', error: error.message });
        }
    },

    // Actualizar un juego por ID
    updateGame: async function(req, res) {
        try {
            let gameId = req.params.id;
            let update = req.body;

            let gameUpdated = await Game.findByIdAndUpdate(gameId, update, { new: true });
            if (!gameUpdated) return res.status(404).send({ message: 'El juego no se puede actualizar' });
            return res.status(200).send({ game: gameUpdated });
        } catch (error) {
            return res.status(500).send({ message: 'Error al actualizar el juego', error: error.message });
        }
    },

    // Eliminar un juego por ID
    deleteGame: async function(req, res) {
        try {
            let gameId = req.params.id;
            let gameRemoved = await Game.findByIdAndDelete(gameId);
            if (!gameRemoved) return res.status(404).send({ message: 'El juego no se puede eliminar' });
            return res.status(200).send({ game: gameRemoved });
        } catch (error) {
            return res.status(500).send({ message: 'Error al eliminar el juego', error: error.message });
        }
    },

    // Subir la portada del juego
    uploadImagen: async function(req, res) {
        try {
            let gameId = req.params.id;
            let fileName = 'Imagen no subida';

            if (req.files) {
                let filePath = req.files.portada.path;
                let fileSplit = filePath.split('\\');
                fileName = fileSplit[1];
                let extSplit = fileName.split('.');
                let fileExt = extSplit[1];

                if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExt.toLowerCase())) {
                    let gameUpdated = await Game.findByIdAndUpdate(gameId, { portada: fileName }, { new: true });
                    if (!gameUpdated) return res.status(404).send({ message: 'El juego no existe y no se puede subir la imagen' });
                    return res.status(200).send({ game: gameUpdated });
                } else {
                    fs.unlink(filePath, (err) => {
                        return res.status(200).send({ message: 'Extensión no válida' });
                    });
                }
            } else {
                return res.status(200).send({ message: fileName });
            }
        } catch (error) {
            return res.status(500).send({ message: 'La imagen no se ha subido', error: error.message });
        }
    }
}


module.exports = controller;