import { Router } from "express";
import { listadoRegiones } from "../controllers/regiones.controller.js";

const routerRegiones = Router();

routerRegiones.get('/', listadoRegiones);

export{
    routerRegiones
}