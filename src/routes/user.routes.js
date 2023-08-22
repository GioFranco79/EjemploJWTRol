import { Router } from 'express';
import { loginUser, createUser } from '../controllers/auth.controller.js'

const routerUser = Router();

routerUser.post('/signin', loginUser);
routerUser.post('/signup', createUser);

