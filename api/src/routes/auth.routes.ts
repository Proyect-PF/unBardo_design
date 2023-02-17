//Enpoint de login y register

import { Router } from "express";
import {POST_SignIn, POST_SignUp} from "../controllers/auth.controller";
const authRouter = Router();


//TODO: RUTA para registrarse como usuario a la base de datos

authRouter.post("/signin", POST_SignIn)


//TODO: RUTA para loguearse como usuario a la base de datos

authRouter.post("/signup", POST_SignUp)











export default authRouter