import { Router } from "express";

const router = Router()

//localhost:3333/usuarios/register
router.post('/register', (request, response)=>{
    response.send("Rota de usuários")
})

export default router;