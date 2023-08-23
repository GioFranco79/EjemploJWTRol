const validateRols = (...rest) => {
    return (req = request, res = response, next) => {
        if (!rest.includes(req.userAuth.rol)){
            return res.status(401).json({
                msg: 'No tienes acceso a este recurso'
            })
        }
        next();
    }
}

export {
    validateRols
}