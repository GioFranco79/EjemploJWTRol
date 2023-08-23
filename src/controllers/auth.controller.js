import bcryptjs from 'bcryptjs';
import { request, response } from 'express';
import { User } from '../models/user.model.js';
import { generateJWT } from '../helpers/generateJWT.js';

const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {email} });
    if (!user){
        return res.json({
            msg: 'Usuario o contraseña invalidas.'
        })
    }
    const passValidate = bcryptjs.compareSync(password, user.password);
    if (!passValidate){
        return res.json ({
            msg: 'Usuario o contraseña invalidas.'
        });
    }
    const token = await generateJWT(user.id);
    res.json({
        msg : 'Login correcto',
        token
    }); 
}

const createUser = async (req = request, res = response) => {
    const { email, password, rol } = req.body;
    const user = {
        email,
        password,
        rol
    }
    const genPass = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,genPass);
    try {
        const userCreated = await User.create(user);
        userCreated.password = "**********";
        res.json(userCreated);
    } catch (error) {
        res.status(500).json({
            msg: 'No se pudo crear el usuario'
        })
    }
}

export {
    loginUser,
    createUser
}