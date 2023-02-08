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

// Create a new order
router.post("/", authMiddleware.verifyToken, ordersController.createOrder);

// Get an order by ID
router.get("/:id", authMiddleware.verifyToken, ordersController.getOrderById);

// // Update an order by ID
// router.put("/:id", authMiddleware.verifyToken, ordersController.updateOrder);
//
// // Delete an order by ID
// router.delete("/:id", authMiddleware.verifyToken, ordersController.deleteOrder);

export default router;
*/
