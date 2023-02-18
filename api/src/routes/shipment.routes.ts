import { Router } from "express";
const shipmentsRoutes = Router();

import {
    UPDATE_ShipmentPrices,
    GET_ShipmentPrices
} from "../controllers/shipment.controller";

//Ruta para actualizar costos de envios
shipmentsRoutes.put("/", UPDATE_ShipmentPrices);

//Ruta para obtener costos de envios
shipmentsRoutes.get("/", GET_ShipmentPrices);

export default shipmentsRoutes;
