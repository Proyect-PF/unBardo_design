import {Express, Request, Response} from "express";
import db from "../database/database";
import axios from "axios";
import { Json } from "sequelize/types/utils";
import dotenv from 'dotenv';

dotenv.config();

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

//Se recibe por query el codigo postal, en la api de LocatioIQ busca la ciudad de Argentina con ese codigo postal y se obtiene el nombre de la ciudad y latitud y longitud.
//Con esa latitud y longitud se ingresa en la api de LocationIQ (junto con la latitud y longitud de MONTE GRANDE) y se obtiene la distancia para el envío
export const GET_Distance = async (req: Request, res: Response) => {
    try {
        const {zip_code} = req.query;        
        //Latitud y Longitud de Monte grande (CP:1842)
        const lonOrigin = -58.465862;
        const latOrigin = -34.819691;

        let lat: number = 0;
        let lon: number = 0;
        let city: string = '';
        let distance: number = 0;
        let shipmentCost: number = 0;

        //Se obtienen los costos de envíos actualizados
        const shipmentInfo = await db.Shipments.findOne();

        //TODO: Con el numero de codigo postal se obtiene la latitud y longitud correspondiente
        //TODO: Busca la propiedad display_name que contenga Argentina
        await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_KEY}&q=${zip_code}&format=json`)
        .then(resp => {
            const word = 'Argentina';
            for (let i = 0; i < resp.data.length; i++) {
                if(resp.data[i].display_name.includes(word)) {
                    lat = resp.data[i].lat;
                    lon = resp.data[i].lon;
                    city = resp.data[i].display_name;
                }
            }
        });
        
        //TODO: Con la latitud y longitud correspondiente se obtiene la distancia del envío
        await axios.get(`https://us1.locationiq.com/v1/directions/driving/${lonOrigin},${latOrigin};${lon},${lat}?key=${process.env.LOCATIONIQ_KEY}&steps=true&alternatives=true&geometries=polyline&overview=full`)
        .then(resp => {
            distance = resp.data.routes[0].distance;
        });

        //TODO: Calcula el costo de envio de acuerdo a la distancia
        if (distance >= 1000000) shipmentCost = distance * shipmentInfo.plus1000 /1000;
        else if (distance >= 500000) shipmentCost = distance * shipmentInfo.minus1000 /1000;
        else if (distance >= 100000) shipmentCost = distance * shipmentInfo.minus500 /1000;
        else shipmentCost = distance * shipmentInfo.minus100 /1000;

        return res.status(200).json({
            city,
            distance,
            shipmentCost
        });
    } catch (error: any) {
        return res.status(400).json({message: error.message});
    }
}