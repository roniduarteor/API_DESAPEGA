import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

import getToken from "../helpers/get-token.js"
import getUserByToken from "../helpers/get-user-by-token.js"


export const create = async (request, response) => {
    const { nome, peso, cor, descricao } = request.body
    const disponivel = 1

    // buscar o token do usuario cadastrado
    const token = getToken(request)
    // pega o usuário para pegar o usuário de acordo com o user
    const user = await getUserByToken(token)

    if (!nome) {
        response.status(400).json({ message: "O nome é obrigatório!" })
    }
    if (!peso) {
        response.status(400).json({ message: "O peso é obrigatório!" })
    }
    if (!cor) {
        response.status(400).json({ message: "A cor é obrigatória!" })
    }
    if (!descricao) {
        response.status(400).json({ message: "A descricao é obrigatória!" })
    }

    const objeto_id = uuidv4()
    const usuario_id = user.usuario_id

    const insertSql = /*sql*/ `
        insert into objetos(??, ??, ??, ??, ??, ??, ??)
        values (?, ?, ?, ?, ?, ?, ?)
    `
    const insertData = [
        "objeto_id",
        "nome",
        "peso",
        "cor",
        "descricao",
        "disponivel",
        "usuario_id",
        objeto_id,
        nome,
        peso,
        cor,
        descricao,
        disponivel,
        usuario_id
    ]

    conn.query(insertSql, insertData, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao cadastrar objeto" })
            return
        }

        if (request.files) {
            // cadastrar no banco
            const insertImageSql = /*sql*/ `insert into objeto_images (image_id, objeto_id, image_path) values ?`
            const imageValues = request.files.map((file) => [
                uuidv4(),
                objeto_id,
                file.filename
            ])
            conn.query(insertImageSql, [imageValues], (err) => {
                if (err) {
                    console.error(err)
                    response.status(500).json({ err: "Erro ao salvar imagem dos objetos" })
                    return
                }
                response.status(201).json("Objeto cadastrado com sucesso!")
            });
        } else {
            response.status(201).json('Objeto cadastrado com sucesso!')
        }


    })
}

export const getAllObjectUser = async (request, response) => {
    try {
        const token = getToken(request)
        const user = await getUserByToken(token)

        const usuarioId = user.usuario_id
        const selectSql = /*sql*/ `
        SELECT 
                obj.objeto_id,
                obj.usuario_id,
                obj.nome,
                obj.peso,
                obj.descricao,
                obj.cor,
                GROUP_CONCAT(obj_img.image_path SEPARATOR',') AS image_path
            FROM
                objetos AS obj
            LEFT JOIN
                objeto_images AS obj_img ON obj.objeto_id = obj_img.objeto_id
            WHERE
                obj.usuario_id = ?
            GROUP BY 
                obj.objeto_id,
                obj.usuario_id,
                obj.nome,
                obj.peso,
                obj.descricao,
                obj.cor
        `

// const selectSql = /*sql*/ `
// SELECT 
//     obj.objeto_id,
//     obj.usuario_id,
//     obj.nome,
//     obj.peso,
//     obj.descricao,
//     obj.cor,
//     GROUP_CONCAT(obj_img.image_path SEPARATOR ',') AS image_path
// FROM
//     objetos AS obj
// LEFT JOIN
//     objeto_images AS obj_img ON obj.objeto_id = obj_img.objeto_id
// WHERE
//     obj.usuario_id = ?
// GROUP BY 
//     obj.objeto_id,
//     obj.usuario_id,
//     obj.nome,
//     obj.peso,
//     obj.descricao,
//     obj.cor
// `;


        conn.query(selectSql, [usuarioId], (err, data) =>{ 
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao buscar objetos"})
                return
            }

            const objetosUsuario = data.map((objeto)=>({
                objeto_id: objeto.objeto_id,
                usuario_id: objeto.usuario_id,
                nome: objeto.nome,
                peso: objeto.peso,
                cor: objeto.cor,
                descricao: objeto.descricao,
                image_paths: objeto.image_path.split(',')
            }))
            response.status(200).json(objetosUsuario)
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({err: 'Erro ao processar a requisição'})
    }
}