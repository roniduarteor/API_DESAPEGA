import express from 'express'
import 'dotenv/config'
import conn from './config/conn.js'

const PORT = process.env.PORT

const app = express()

//404
app.use((request, response)=>{
    response.status(404).json({message: 'Recurso não encontrada'})
})

app.get('/', (request, response)=>{
    response.send('Olá, Mundo')
})

app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})