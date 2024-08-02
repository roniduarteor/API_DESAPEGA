import jwt from 'jsonwebtoken'
import getToken from './get-token.js'

const verifyToken = (request, response, next) => { // é um middleware ent precisamos passar esses 3 parâmetros
    if(!request.headers.authorization){
        response.status(401).json({err: "Acesso negado"})
        return
    }

    const token = getToken(request)  // é um middleware ent precisamos passar esses 3 parâmetros
        if(!token){
            response.status(401).json({err: "Acesso negado"})
            return
        }
    
        try {
            const verified = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")
            request.usuario = verified;
            next()
        } catch (error) {
            console.error(error)
            response.status(400).json({err: "Token inválido!"})
            return
        }
};



export default verifyToken;