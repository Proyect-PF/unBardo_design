import { Router } from "express";
const ordersRoutes = Router();

import {
    GET_AllOrders,
    GET_DetailsByOrderId,
    POST_Order,
    UPDATE_OrderStatus,
    DELETE_Order,
} from "../controllers/controllers_order";

import {
    POST_GeneratePayment,
    GET_FeedbackPayment,
} from "../controllers/controllers_mercadopago";

//MERCADOPAGO
ordersRoutes.post("/payment/", POST_GeneratePayment);

ordersRoutes.get("/feedback/", GET_FeedbackPayment);

//GET todas las ordenes
ordersRoutes.get("/", GET_AllOrders);

//GET orden por ID
ordersRoutes.get("/:orderId", GET_DetailsByOrderId);

//POST orden
ordersRoutes.post("/", POST_Order);

//UPDATE estado de la orden
ordersRoutes.put("/", UPDATE_OrderStatus);

ordersRoutes.delete("/:id", DELETE_Order);

export default ordersRoutes;