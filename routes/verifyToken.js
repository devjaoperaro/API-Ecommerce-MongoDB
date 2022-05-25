const jwt = require('jsonwebtoken');

// middleware verificando token chave secreta
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' })
            }
            // recebo as info de user
            req.user = user
            next()
        });

    }else{
        return res.status(401).json({ message: 'Você não está autenticado' });
    }
}

// verifica se o usuario pode acessar a rota por estar autenticado
const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        }else{
            return res.status(403).json('Você não está autenticado');
        }
    });
}

// verifica o admin
const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user.isAdmin); 
        if (req.user.isAdmin) {
            next();
        }else{
            return res.status(403).json('Você não está autenticado');
        }
    });
}

module.exports = {verifyToken, verifyTokenAuthorization, verifyTokenAdmin};