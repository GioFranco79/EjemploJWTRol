import { Router } from 'express';
import { loginUser, createUser } from '../controllers/auth.controller.js'
//import { validateRol } from '';

routerUser.post('/signin', loginUser);
routerUSer.post('/signup', createUser);

