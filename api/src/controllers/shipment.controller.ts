import {Express, Request, Response} from "express";
import db from "../database/database";

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
    minus100: number;
    minus500: number;
    minus1000: number;
    plus1000: number;
}

//UPDATE de los valores para calculos de envíos. Si no existe nunguna tabla la crea, pero si existe la modifica (esto lo realiza la función UpdateOrCreate).
export const UPDATE_ShipmentPrices = async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
    try {
        const {minus100, minus500, minus1000, plus1000} = req.query;
        
        const shipment = await UpdateOrCreate(minus100, minus500, minus1000, plus1000);

        if (!shipment) return res.status(404).json({message: "Datos de precios de envios no encontrados"});
        return res.status(200).json(shipment);
    } catch (error: any) {
        return res.status(400).json({message: error.message});
    }
}

//Funcion que crea la tabla si no existe, y en caso de existir la actualiza. Esto se hace para el primer ciclo cuando la base de datos esta vacía
const UpdateOrCreate = async (minus100: number, minus500: number, minus1000: number, plus1000: number) => {
    try {
        const lastShipment = await db.Shipments.findAll({
            order: [['id', 'DESC']],
          });
        const shipmentUpdate = await db.Shipments.update({
            minus100,
            minus500,
            minus1000,
            plus1000
        },{
            where: {
                id: lastShipment[0].id
            }
        });
        return shipmentUpdate;
    } catch (error) {
        const shipCreate = await db.Shipments.create({
            minus100,
            minus500,
            minus1000,
            plus1000
        })        
        return shipCreate;
    }
};

//Ruta GET para obtener los valores de los costos de envío
export const GET_ShipmentPrices = async (req: Request, res: Response) => {
    try {        
        const shipmentInfo = await db.Shipments.findAll();
        if (!shipmentInfo) return res.status(404).json({message: "Datos de precios de envios no encontrados"});
        return res.status(200).json(shipmentInfo);
    } catch (error: any) {
        return res.status(400).json({message: error.message});
    }
}

