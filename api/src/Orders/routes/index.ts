// routes/orders.ts
import { Router } from "express";
import * as ordersController from "../controllers/index";
import * as authMiddleware from "../middlewares/index";

const router = Router();

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

