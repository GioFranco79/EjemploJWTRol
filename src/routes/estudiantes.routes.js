import { Router } from "express";
import { listadoEstudiantes } from "../controllers/estudiantes.controller.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { validateRols } from "../middlewares/validateROL.js";

const routerEstudiantes = Router();

routerEstudiantes.post('/', [
    validateJWT,
    validateRols('ADMIN')
], listadoEstudiantes);

export {
    routerEstudiantes
}