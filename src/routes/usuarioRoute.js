import { Router } from "express";

import { register } from "../controllers/usuarioController.js";

const router = Router()

//localhost:3333/usuarios/register
router.post('/register', register)

export default router;