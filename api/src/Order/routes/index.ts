import { Router } from "express";
import deleteOrder from "../controllers/deleteOrder";
import putOrder from "../controllers/putOrder";
import getOrder from "../controllers/getOrder";
import postOrder from "../controllers/postOrder";

const orderRoutes = Router();

orderRoutes.delete("/", deleteOrder);

orderRoutes.put("/", putOrder);

orderRoutes.get("/", getOrder);

orderRoutes.post("/", postOrder);

export default orderRoutes;
