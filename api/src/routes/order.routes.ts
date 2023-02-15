import { Router } from "express";
const ordersRoutes = Router();

import {
    GET_AllOrders,
    GET_DetailsByOrderId,
    POST_Order,
    UPDATE_OrderStatus,
    DELETE_Order,
    DELETE_AllOrders,
    GET_OrderByUser
} from "../controllers/order.controller";

import {
    POST_GeneratePayment,
    POST_FeedbackPayment,
} from "../controllers/mercado-pago.controller";


//MERCADOPAGO
ordersRoutes.post("/payment/", POST_GeneratePayment);

ordersRoutes.post("/feedback/", POST_FeedbackPayment);

//GET todas las ordenes
ordersRoutes.get("/", GET_AllOrders);

//GET orden por ID
ordersRoutes.get("/:orderId", GET_DetailsByOrderId);

//GET orden por ID de usuario
ordersRoutes.get("/users/:id_user", GET_OrderByUser);

//POST orden
ordersRoutes.post("/", POST_Order);

//UPDATE estado de la orden
ordersRoutes.put("/", UPDATE_OrderStatus);

ordersRoutes.delete("/:id", DELETE_Order);

ordersRoutes.delete("/", DELETE_AllOrders);

export default ordersRoutes;
