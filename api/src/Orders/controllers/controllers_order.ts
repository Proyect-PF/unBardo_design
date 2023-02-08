import { Express, Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../database";
const mercadopago = require('mercadopago');

//MERCADOPAGO
mercadopago.configure({
  //access_token: process.env.MERCADOPAGO_KEY,
  access_token: "TEST-6048539528179925-020714-f42fb626d9eccb6ec0e04d307f902464-1207110990",
});

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {
  id: number;     //id del producto
  title: string;  //Este es el name del producto
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
        area_code: prod.area_code.toString() || null,
        number: prod.number.toString() || null
      },
      address: {
        zip_code: prod.zip_code.toString() || null,
        street_name: prod.street_name || null,
        street_number: prod.street_number.toString() || null
      },
      email: prod.email,
      name: prod.name,
      surname: prod.surname,
    },
  }

  

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

