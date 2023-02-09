// IMPORTS
import { Router } from "express";
const validationsRoutes = Router();

import validateOrder from "./validateOrder";


validationsRoutes.post("/stock", validateOrder);


export default validateOrder;
