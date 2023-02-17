
import { Router } from "express";
import  POST_Image from "../controllers/image/post-image";
const imageRoutes = Router();


/**
 //TODO: RUTA para postear varias imagenes
 */
imageRoutes.post("/", POST_Image);

export default imageRoutes;