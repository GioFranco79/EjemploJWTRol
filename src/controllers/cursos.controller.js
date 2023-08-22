import { request, response } from "express";
import { Curso } from "../models/curso.model.js";

const listadoCursos = async (req = request, res = response) => {
    try {
        const cursos = await Curso.findAll();
        res.status(200).json(cursos);   
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

export{
    listadoCursos
}