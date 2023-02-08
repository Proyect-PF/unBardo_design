//Enpoint de login y register

import { Router } from "express";
import {POST_SignIn, POST_SignUp} from "../controllers/controllers_auth";
const authRouter = Router();


//Ingresar a la app
authRouter.post("/signin", POST_SignIn)

//Loggearse
authRouter.post("/signup", POST_SignUp)











export default authRouter