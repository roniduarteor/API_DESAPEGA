import { Router } from "express";

import { create, getAllObjectUser } from '../controllers/objetoController.js'


import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js";

const router = Router()
router.post('/create', verifyToken, imageUpload.array("imagens", 10), create)
// listar todos os objetos
// resgatar objeto pelo id
// listar todas as imagens de um objeto
// listar todas as imagens que pertence a um usuário
router.get("/usuarios/imagens", verifyToken, getAllObjectUser)

export default router; 

