import { Router } from "express";
const ordersRoutes = Router();

import {
    POST_GeneratePayment,
    GET_FeedbackPayment,
    GET_AllOrders,
    GET_OrderById,
    POST_Order,
    getLastOrder,
    GET_DetailsByOrderId
} from "../controllers/controllers_order";

//MERCADOPAGO
ordersRoutes.post("/payment/", POST_GeneratePayment);

ordersRoutes.get("/feedback/", GET_FeedbackPayment);

//GET todas las ordenes
ordersRoutes.get("/", GET_AllOrders);

//GET orden por ID
ordersRoutes.get("/:id", GET_OrderById);

//POST orden
ordersRoutes.post("/", POST_Order);

ordersRoutes.get("/:userId", getLastOrder);

ordersRoutes.get("/order/:orderId", GET_DetailsByOrderId);

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