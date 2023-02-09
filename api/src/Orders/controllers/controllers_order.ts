import { Express, Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../database";
import dotenv from "dotenv";
const mercadopago = require('mercadopago');
dotenv.config();

//MERCADOPAGO
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_KEY,
  //access_token: "APP_USR-4964430421416242-020813-c46f247ea7b1f91937c722b8ea7b4134-1305644016",
});

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {
  id: number;         //id del producto
  title: string;      //Este es el name del producto
  price: number;
  quantity: number;
  area_code: number;  //Telefono
  number: number;     //Telefono
  zip_code: number;       //direccion
  street_name: string;    //direccion
  street_number: number;  //direccion
  email: string;
  name: string;
  surname: string;
}

interface RequestQuery {}

export const POST_GeneratePayment =async (
  request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  response: Response
) => {
  const prod = request.body;

  //TODO: items => información relacionada al producto
  //TODO: back_urls => rutas a las que direcciona de acuerdo al estado del pago
  //TODO: binary_mode => al estar en true no adopta la ruta "pending"
  //TODO: payer => información del comprador
  let preference = {
    items: [
      {
        id: prod.id,
        currency_id: "ARS",
        title: prod.title,
				unit_price: prod.price,
				quantity: prod.quantity,
      }
    ],
    back_urls: {
      "success": "http://localhost:3700/orders/feedback",
			"failure": "http://localhost:3700/orders/feedback",
			"pending": ""
    },
    auto_return: "approved",
    binary_mode: true,
    payer: {
      phone: {
        area_code: prod.area_code.toString(),
        number: prod.number
      },
      address: {
        zip_code: prod.zip_code.toString(),
        street_name: prod.street_name,
        street_number: prod.street_number
      },
      email: prod.email,
      name: prod.name,
      surname: prod.surname,
    },
  }

  //TODO: se crea el proceso de pago
  mercadopago.preferences.create(preference)
		.then(function (res: any) {
			return response.status(201).json({
				//id: res.body.id
        res,
			});
		}).catch(function (error: any) {
			console.log(error);
      return response.status(400).json(error)
		});
}

//ruta de respuesta de mercadopago cuando el pago se realiza exitosamente y cuando falla
export const GET_FeedbackPayment =async (
  request: Request,
  response: Response
) => {
  const feedback = request.query;
  console.log(feedback);
  
  response.status(200).json({
		Payment: feedback.payment_id,
		Status: feedback.status,
		MerchantOrder: feedback.merchant_order_id
	});
}

//Obtener todas las ordenes
export const GET_AllOrders = async (req: Request, res: Response) => {
  try {
      const orders = await db.Orders.findAll({
          include: [
              {
                  model: db.Users,
                  as: "users"
              }
          ]
      });
      return res.status(200).json(orders);
    } catch (error: any) {
      return res.status(400).json({message: error.message});
    }
  };

// Obtener oden por ID
export const GET_OrderById = async (req: Request, res: Response) => {
  try {
      const {id} = req.params;
      const order = await db.Orders.findOne({
          where: {id},
          include: [
            {
                  model: db.Users,
                  as: "user"
                }
              ]
            });        if (!order) {
              return res.status(404).json({message: "Orden no encontrada"});
            }
            return res.status(200).json(order);
          } catch (error: any) {
            return res.status(400).json({
              message: error.message
            });
          }
        };
        
        
// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
      const order = req.body;
      const newOrder = await db.Orders.create(order);
      return res.status(201).json(newOrder);
  } catch (error: any) {
      return res.status(400).json({message: error.message});
  }
};