import express from 'express';
import cors from 'cors';
/*import hbs from 'hbs'; // Para agregar helpers */
import { routerEstudiantes } from '../routes/estudiantes.routes.js';
import { routerRegiones } from '../routes/regiones.routes.js';
import { routerCursos } from '../routes/cursos.routes.js';

export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        /*this.app.set('view engine', 'hbs');*/
        this.app.use(express.static('public'));
        this.app.use(express.json());
        /*hbs.registerPartials(__dirname + '/views/partials');*/
    }

    routes() {
        this.app.use('/login', routesLogin);
        this.app.use('/api/estudiantes', routerEstudiantes);
        this.app.use('/api/regiones', routerRegiones);
        this.app.use('/api/cursos', routerCursos);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`)
        })
    }
}