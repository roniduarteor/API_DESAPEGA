import { Router } from "express";

import { checkUser, login, register, getUserById, editUser } from "../controllers/usuarioController.js";

//importar os helpers
import validarUsuario from "../helpers/validar-user.js";
import verifyToken from '../helpers/verify-token.js'
import imageUpload from "../helpers/image-upload.js";

const router = Router()

//localhost:3333/usuarios/register
router.post('/register', validarUsuario, register)
router.post('/login', login)
router.get('/checkuser', checkUser) // auxiliar o front-end
router.get("/:id", getUserById)
router.put('/edit/:id', verifyToken, imageUpload.single('imagem'), editUser)

export default router;