import { request, response } from "express";
import { Estudiante } from "../models/estudiante.model.js";
import { Curso } from "../models/curso.model.js";
import { Comuna } from "../models/comuna.model.js";
import { Region } from "../models/region.model.js";
import { PlanFormativo } from "../models/planFormativo.model.js";

const listadoEstudiantes = async (req = request, res = response) => {
    const { region, curso } = req.body;   
    try {
        const regiones = await Region.findAll();
        const planes = await Curso.findAll();
        let arregloEstudiantes = [];
        if (region && curso) {
            arregloEstudiantes = await Estudiante.findAll({
                    include: [
                        {
                            model: Curso,
                            where: { codigo_curso: curso },
                            include: [{
                                model: PlanFormativo                                
                            }]
                        },
                        {
                            model: Comuna,
                            where: { codigo_region: region },
                            include: [{
                                model: Region
                            }]
                        }
                    ]
                });                
        } else if (region) {
            arregloEstudiantes = await Estudiante.findAll({
                include: [
                    {
                        model: Curso,
                        include: [{
                            model: PlanFormativo                                
                        }]
                    },
                    {
                        model: Comuna,
                        where: { codigo_region: region },
                        include: [{
                            model: Region
                        }]
                    }                    
                ]
            });            
        } else if (curso) {
            arregloEstudiantes = await Estudiante.findAll({
                include: [
                    {
                        model: Curso,
                        where: { codigo_curso: curso },             
                        include: [{
                            model: PlanFormativo                            
                        }]
                    },
                    {
                        model: Comuna,
                        include: [{
                            model: Region
                        }]
                    }                    
                ]
            });            
        } else {
            arregloEstudiantes = await Estudiante.findAll({
                include: [
                    {
                        model: Curso,
                        include: [{
                            model: PlanFormativo                                
                        }]
                    },
                    {
                        model: Comuna,
                        include: [{
                            model: Region
                        }]
                    }
                ]
            });            
        }        
        res.status(200).json(arregloEstudiantes);
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
    listadoEstudiantes
}
