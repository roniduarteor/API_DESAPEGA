import express from 'express'
import 'dotenv/config'
import conn from './config/conn.js'

const PORT = process.env.PORT

const app = express()

app.get('/', (request, response)=>{
    response.send('Olá, Mundo')
})

app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})