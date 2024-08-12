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

    //Para obtener juegos relacionados por plataforma y genero
    getGamesByFilters: async function(req,res) {
        try {
            const {plataforma, genero} = req.query;

            //construir objeto de filtro
            let filters = {};
            if(plataforma) filters.plataforma = plataforma;
            if(genero) filters.genero = genero;

            //consultar los juegos segun los filtros
            const games = await Game.find(filters);

            if(games == 0) return res.status(404).send({message: "No se encontraron juegos con esas caracteristicas"});
            return res.status(200).send({games});           
        } catch (error) {
        return res.status(500).send({ message: 'Error al obtener los juegos', error: error.message });
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
    }

    

}

module.exports = controller;