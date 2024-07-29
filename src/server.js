import express, { response } from 'express'

const PORT = 3333

const app = express()

app.get('/', (request, response)=>{
    response.send('Olá, Mundo')
})

app.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}`)
})