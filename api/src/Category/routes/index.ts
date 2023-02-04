import { Router } from 'express';
import getCategory from "../controllers/getCategory";

import postCategory from "../controllers/postCategory";


const categoryRoutes = Router();
categoryRoutes.get("/", getCategory);
categoryRoutes.post("/", postCategory);
export default categoryRoutes;