import { Router } from "express";
const ordersRoutes = Router();

import {
    POST_GeneratePayment,
    GET_FeedbackPayment    
} from "../controllers/controllers_order";

//MERCADOPAGO
ordersRoutes.post("/payment/", POST_GeneratePayment);

ordersRoutes.get("/feedback/", GET_FeedbackPayment);

export default ordersRoutes;

/*
import * as ordersController from "../controllers/index";
import * as authMiddleware from "../middlewares/index";


// Get all orders
router.get("/", authMiddleware.verifyToken, ordersController.getAllOrders);
	@@ -34,4 +21,4 @@ router.get("/:id", authMiddleware.verifyToken, ordersController.getOrderById);
// router.delete("/:id", authMiddleware.verifyToken, ordersController.deleteOrder);

export default router;
*/