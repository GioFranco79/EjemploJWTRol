import { Router } from "express";
import { listadoCursos } from "../controllers/cursos.controller.js";


const routerCursos = Router();

routerCursos.get('/', listadoCursos);

export{
    routerCursos
}