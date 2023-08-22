import { Router } from "express";
import { listadoEstudiantes } from "../controllers/estudiantes.controller.js";


const routerEstudiantes = Router();

routerEstudiantes.post('/', listadoEstudiantes);

export {
    routerEstudiantes
}