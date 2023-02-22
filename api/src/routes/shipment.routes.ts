import { Router } from "express";
const shipmentsRoutes = Router();

import {
    UPDATE_ShipmentPrices,
    GET_ShipmentPrices,
    GET_Distance
} from "../controllers/shipment.controller";
import { verifyTokenIsAdmin } from "../helpers/verifyTokenIsAdmin";

//Ruta para actualizar costos de envios
shipmentsRoutes.put("/", UPDATE_ShipmentPrices);

//Ruta para obtener costos de envios
shipmentsRoutes.get("/", GET_ShipmentPrices);

//Ruta para obtener el costo de envío segun la distancia
shipmentsRoutes.get("/distance/", GET_Distance);

export default shipmentsRoutes;
