import express from 'express'
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import conn from './config/conn.js'

import './models/usuarioModel.js'
import './models/objetoModel.js'
import './models/objetoImagensModel.js'

const PORT = process.env.PORT

//importar as rotas
import usuarioRouter from './routes/usuarioRoute.js'
import objetoRouter from './routes/objetoRouter.js'

const app = express()

app.use(express.urlencoded({ extended: true })) // para trabalhar com imagens
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)// nome do arquivo
const __dirname = path.dirname(__filename) // caminho do arquivo

//localizar onde está a pasta public
app.use("/public", express.static(path.join(__dirname, "public")))

//CORS
app.use()   

//Utilizar a rota
app.use('/usuarios', usuarioRouter)
app.use('/objetos', objetoRouter)

//404
app.use((request, response) => {
    response.status(404).json({ message: 'Recurso não encontrado' })
})
// sempre usar depois de todas as rotas

//404
// app.get('*', (request, response)=>{ // usar o * também serve como rota 404
//     response.send('Olá, Mundo')
// })

app.listen(PORT, () => {
    console.log(`Servidor on PORT ${PORT}`)
})