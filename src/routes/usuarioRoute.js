import { Router } from "express";

import { login, register } from "../controllers/usuarioController.js";

//importar os helpers
import validarUsuario from "../helpers/validar-user.js";

const router = Router()

//localhost:3333/usuarios/register
router.post('/register', validarUsuario, register)
router.post('/login', login)

export default router;