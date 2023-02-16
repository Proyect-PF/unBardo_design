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
/**
 * TODO => RUTA GET para generar un pago
 */
ordersRoutes.post("/payment/", POST_GeneratePayment);
/**
 * TODO => RUTA GET para devolver el pago
 */
ordersRoutes.post("/feedback/", POST_FeedbackPayment);


/**
 *  TODO => RUTA GET Obtener todas las ordenes 
 */
ordersRoutes.get("/", GET_AllOrders);

/**
 *  TODO => RUTA GET Obtener Ordenes por ID
 */
ordersRoutes.get("/:orderId", GET_DetailsByOrderId);


/**
 * TODO => RUTA GET Obtener orden por ID de usuario
 */
ordersRoutes.get("/users/:id_user", GET_OrderByUser);

/**
 * TODO => RUTA POST orden
 */
ordersRoutes.post("/", POST_Order);

/**
 * TODO => RUTA UPDATE estado de la orden
 */
ordersRoutes.put("/", UPDATE_OrderStatus);

/**
 * TODO => RUTA DELETE Borrar una orden por id
 */
ordersRoutes.delete("/:id", DELETE_Order);

/**
 * TODO => RUTA DELETE Borrar todas las ordenes
 */
ordersRoutes.delete("/", DELETE_AllOrders);

export default ordersRoutes;
