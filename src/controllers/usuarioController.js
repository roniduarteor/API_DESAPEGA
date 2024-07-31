import conn from "../config/conn.js"
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'


// helpers
import createUserToken from "../helpers/create-user-token.js"

// Criar usuário
export const register = (request, response) => {
    const {nome, email, telefone, senha, confirmsenha} = request.body

    const checkEmailSQL = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
    const checkEmailData = ["email", email]

    conn.query(checkEmailSQL, checkEmailData, async (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({err: 'Não foi possível buscar usuário'})
            return
        }

        if(data.length > 0){
            response.status(409).json({message: 'Email já está em uso!'})
            return
        }

        //criar a senha do usuario
        const salt = await bcrypt.genSalt(12) // instrução asíncrona, precisa esperar receber algo para construir
        const senhaHash = await bcrypt.hash(senha, salt)
        // console.log(salt) // 12 para evitar que existam senhas iguas no banco de dados
        // console.log("Senha recebida: ", senha)
        // console.log("Senha Criptografada: ", senhaHash)

        // CADASTRAR USUÁRIO
        const id = uuidv4()
        const imagem = 'userDefault.png'

        const insertSql = /*sql*/ `insert into usuarios(??, ??, ??, ??, ??, ??)
        values(?, ?, ?, ?, ?, ?)`

        const insertData = ['usuario_id', 'nome', 'email', 'telefone', 'senha', 'imagem', id, nome, email, telefone, senha, imagem]

        conn.query(insertSql, insertData, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({err: 'Erro ao cadastrar usuário'})
                return
            }

            //depois de cadastrado preciso fazer uma nova consulta para buscar o usuário
            const usuarioSql = /*sql*/ `select * from usuarios where ?? = ?`

            const usuarioData = ["usuario_id", id]

            conn.query(usuarioSql, usuarioData, async (err, data)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({err: "Erro ao selecionar usuário"})
                    return
                }
                const usuario = data[0]
                
                try {
                    await createUserToken(usuario, request, response) // lembrar de colocar o async no começo da função
                } catch (error) {
                    console.error(error)
                }
            })

            // Usuário esteja logado na aplicação
            // createUserToken()
            
        })
    })
}

// Login

export const login = (request, response) => {
    response.send("Olá, Mundo!")
}