import jwt from 'jsonwebtoken'

// assincrono
const createUserToken = async (usuario, request, response) => { // preciso passar o usuario do banco de dados, fazer a requisição pra ver se corresponde com o token
    // Criar o token

    const token = jwt.sign( // .sign responsável por criar o token, dentro dela preciso passar um objeto, e também criptografar o token
        {
            nome: usuario.nome,
            id: usuario.usuario_id
        },
        'SENHASUPERSEGURAEDIFICIL' // coloca a senha para a criptografia
    ) 

    // Responder/Retornar o token
    response.status(200).json({
        message: "Você está logado!",
        token: token,
        usuarioId: usuario.usuario_id
    })
}

export default createUserToken