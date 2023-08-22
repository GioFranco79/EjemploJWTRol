import { request, response } from "express";
import { Region } from "../models/region.model.js";

const listadoRegiones = async (req = request, res = response) => {
    try {
        const regiones = await Region.findAll();
        res.status(200).json(regiones);   
    } catch (error) {
        console.log(error.name, error.message);
        res.status(500).json({
            message: error.message,
            code: 500,
            name: error.name,
            mensajePersonalizado: 'Error en el servidor, findAll estudiante'
        });        
    }
}

export {
    listadoRegiones
}