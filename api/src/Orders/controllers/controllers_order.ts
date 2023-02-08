import { Express, Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../database";
const mercadopago = require('mercadopago');

//MERCADOPAGO
mercadopago.configure({
  //access_token: process.env.MERCADOPAGO_KEY,
  access_token: "TEST-6048539528179925-020714-f42fb626d9eccb6ec0e04d307f902464-1207110990",
});

// Información que se recibe por body
/*{
  id,             //id del producto
  title,          //Este es el name del producto
  price,
  quantity,
  area_code,      //Telefono
  number,         //Telefono
  zip_code,       //direccion
  street_name,    //direccion
  street_number,  //direccion
  email,
  name,
  surname,
}*/

export const POST_GeneratePayment =async (
  request: Request,
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
        area_code: prod.area_code,
        number: prod.number
      },
      address: {
        zip_code: prod.zip_code,
        street_name: prod.street_name,
        street_number: prod.street_number || null
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

