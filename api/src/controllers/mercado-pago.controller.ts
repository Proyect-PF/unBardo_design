import axios from 'axios';
import dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../database/database';
import OrderProduct from '../database/models/order-product.model';
import Product from '../database/models/product.model';
import cloudinary from '../utils/cloudinary';

const mercadopago = require('mercadopago');
dotenv.config();

//MERCADOPAGO
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_KEY,
});

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {
  area_code: number; //Telefono
  number: number; //Telefono
  zip_code: number; //direccion
  street_name: string; //direccion
  street_number: number; //direccion
  id_user: number; //id de usuario
  id_order: number; //id de la orden
}

interface RequestQuery {}

//-------------------------------- MERCADOPAGO --------------------------------
//Obtiene la ultima orden generada por el usuario => para usar en MERCADOPAGO
//const GET_OrderLast = async (id_user: number, id_order: number) => { //TODO: SI TIENE UN ID DE ORDEN BUSCA ESA ORDEN, SINO, BUSCA LA ULTIMA DEL USUARIO
const GET_OrderLast = async (id_user: number) => {
  try {
    // if(id_order) {
    //     const idOrder = await db.Orders.findOne({
    //         where: {
    //             id_order,
    //             status: "cart"
    //         },
    //         });
    //     return idOrder;
    // }
    const lastOrder = await db.Orders.findOne({
      where: {
        id_user,
        status: 'cart',
      },
      order: [['id', 'DESC']],
    });
    //console.log(lastOrder);
    return lastOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Obtiene la informacion del usuario relacionada a la orden de compra => para usar en MERCADOPAGO
const GET_OrderUser = async (id: number) => {
  try {
    const orderUser = await db.Orders.findOne({
      where: { id },
      include: [
        {
          model: db.Users,
          as: 'users',
        },
      ],
    });
    return orderUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Obtiene la informacion de los productos de la orden en un array de objetos, donde cada objeto contiene la informacion del producto => para usar en MERCADOPAGO
const GET_OrderDescription = async (id_order: number) => {
  try {
    let items = [];
    const orderUser = await db.OrderProducts.findAll({
      where: { id_order },
    });


        for (const element of orderUser) {
            const prod = await db.Product.findOne({
                where: {id: element.id_product}
            });
            let quantity: number = 0;
            for (const key in element.sizes) {
                if (element.sizes[key]) {
                    quantity = quantity + element.sizes[key];
                }
            }
            const product = {
                id: element.id_product,
                currency_id: "ARS",
                description: prod.description,
                title: prod.name,
                quantity: quantity,
                unit_price: prod.promotion === true? prod.promotional_price: prod.price
            }
            items.push(product);

        } 
    return items;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Update el stock del talle S
const UPDATE_ProductSizeS = async (id: number, S: number) => {
  try {
    const orderUpdate = await db.Product.update(
      {
        S,
      },
      {
        where: { id },
      }
    );
    return orderUpdate;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Update el stock del talle M
const UPDATE_ProductSizeM = async (id: number, M: number) => {
  try {
    const orderUpdate = await db.Product.update(
      {
        M,
      },
      {
        where: { id },
      }
    );
    return orderUpdate;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Update el stock del talle L
const UPDATE_ProductSizeL = async (id: number, L: number) => {
  try {
    const orderUpdate = await db.Product.update(
      {
        L,
      },
      {
        where: { id },
      }
    );
    return orderUpdate;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Update el stock del talle XL
const UPDATE_ProductSizeXL = async (id: number, XL: number) => {
  try {
    const orderUpdate = await db.Product.update(
      {
        XL,
      },
      {
        where: { id },
      }
    );
    return orderUpdate;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//Update el stock de todos los talles segun ID de orden
const UPDATE_QuantitySizes = async (id_order: number) => {

    try {
        //Se obtiene el detalle de los productos de la orden
        const orderProd = await db.OrderProducts.findAll({
            where: {id_order},
        });
        //TODO: Se recorre todos los talles de cada producto de esa orden, y en el producto correspondiente, si ese talle fue vendido, se le descuenta al stock la cantidad
        for (const element of orderProd) {
            const prod = await db.Product.findOne({
                where: {id: element.id_product}
            });
            if(element.sizes.S) {
                const S:number = prod.S - element.sizes.S;
                await UPDATE_ProductSizeS(element.id_product, S)      
            }
            if(element.sizes.M) {
                const M:number = prod.M - element.sizes.M;
                await UPDATE_ProductSizeM(element.id_product, M)      
            }
            if(element.sizes.L) {
                const L:number = prod.L - element.sizes.L;
                await UPDATE_ProductSizeL(element.id_product, L)          
            }
            if(element.sizes.XL) {
                const XL:number = prod.XL - element.sizes.XL;
                await UPDATE_ProductSizeXL(element.id_product, XL)            
            }
        }
        return orderProd;
    } catch (error: any) {
        throw new Error(error.message);

    }
};

//Verifica si hay stock disponible antes de realizar el pago
const Verify_QuantitySizes = async (id_order: number) => {
    try {
        //Se obtiene el detalle de los productos de la orden
        const orderProd = await db.OrderProducts.findAll({
            where: {id_order},
        });
        //TODO: Se recorre todos los talles de cada producto de esa orden, y en el producto correspondiente, si ese talle tiene menor stock retorna false
        for (const element of orderProd) {
            const prod = await db.Product.findOne({
                where: {id: element.id_product}
            });
            if(element.sizes.S) {
                if (prod.S < element.sizes.S) return false
            }
            if(element.sizes.M) {
                if (prod.M < element.sizes.M) return false 
            }
            if(element.sizes.L) {
                if (prod.L < element.sizes.L) return false 
            }
            if(element.sizes.XL) {
                if (prod.XL < element.sizes.XL) return false 
            }
        }
        return true;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//ruta POST MERCADOPAGO
export const POST_GeneratePayment = async (
  request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  response: Response
) => {
  const prod = request.body; //se recibe por body => id_user, area_code, number, zip_code, street_name, street_number

  //TODO: Se utiliza el id del usuario que se obtiene por body para obtener la información de la ultima orden del usuario
  //const last = await GET_OrderLast(prod.id_user, prod.id_order) //last.id => id de la orden de compra del usuario
  const last = await GET_OrderLast(prod.id_user);

  //TODO: Se utiliza el id de la orden de compra como referencia externa para mercado pago. Esta referencia externa es la que permite conectar la información que se utiliza en el POST de mercadopago con la recibida al finalizar la compra y así poder obtener el estado de la compra
  const external_reference = last.id.toString();

  //Obtiene la informacion del usuario relacionada a la orden de compra
  const userInfo = await GET_OrderUser(last.id); //userInfo.users.fullname; userInfo.users.email


    //Obtiene la informacion de cada producto de la orden como un array de objetos, donde cada objeto tiene id (del rpoducto), currency_id: "ARS", description, title, quantity, unit_price
    const prodInfo = await GET_OrderDescription(last.id);
    
    //Verifica si hay stock disponible de los productos, en caso contrario no se puede continuar con la compra
    const stockAvailable = await Verify_QuantitySizes(last.id);
    if (stockAvailable === false) return response.status(400).json('EXISTE ALGUN PRODUCTO SIN STOCK NECESARIO')

    //TODO: items => información relacionada al producto
    //TODO: back_urls => rutas a las que direcciona de acuerdo al estado del pago
    //TODO: binary_mode => al estar en true no adopta la ruta "pending"
    //TODO: payer => información del comprador
    let preference = {
        items: prodInfo,
        back_urls: {
            "success": "http://localhost:3000/orders/feedback", //"http://localhost:3700/orders/feedback" //"http://localhost:3000"
            "failure": "http://localhost:3000/orders/feedback", //"http://localhost:3700/orders/feedback" //"http://localhost:3000"
            "pending": ""
        },
        auto_return: "approved",
        binary_mode: true,
        external_reference: external_reference,
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
            email: userInfo.users.email,
            name: userInfo.users.fullname,
            surname: '',
        },
    }


  //TODO: se crea el proceso de pago
  mercadopago.preferences
    .create(preference)
    .then(function (res: any) {
      return response.status(201).json({
        //id: res.body.id
        res,
      });
    })
    .catch(function (error: any) {
      console.log(error);
      return response.status(400).json(error);
    });
};

//ruta de respuesta de mercadopago cuando el pago se realiza exitosamente y cuando falla
export const POST_FeedbackPayment = async (
    request: Request,
    response: Response
) => {
    try {
        const feedback = request.body; //recibe por query external_reference (id de la orden), status (estado del pago), Payment, MerchantOrder
        
        const payment_detail = await axios.get(`https://api.mercadopago.com/v1/payments/${feedback.payment_id}`,
        {
            headers: {
                "Content-types": "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_KEY}`
            },
        });

        //TODO: Se realiza un update del status. Inicialmente es cart, y se actualiza al estado del pago. Actualiza tambien el payment_id por el que suministra mercadopago
        await db.Orders.update({
            //status: feedback.status,
            status: payment_detail.data.status,
            payment_id: Number(feedback.payment_id),
        },{
            where: {
                id: feedback.external_reference
            }
        })
       
        if (payment_detail.data.status === 'approved') {
            var orderAproved = await UPDATE_QuantitySizes(Number(feedback.external_reference))
        }
        console.log(feedback.external_reference);
        console.log(payment_detail.data.status);
        console.log(feedback.payment_id);
        
        return response.status(200).json({
            payment_id: feedback.payment_id,
            status: payment_detail.data.status,
            external_reference: feedback.external_reference,
            items: payment_detail.data.additional_info.items,
            payment_method: payment_detail.data.payment_method_id,
            payment_type: payment_detail.data.payment_type_id,
            total_amount: payment_detail.data.transaction_amount,
            cuotes: payment_detail.data.installments,
            total_paid_amount: payment_detail.data.transaction_details.total_paid_amount,
            //orderAproved,
        });
    } catch (error: any) {
        return response.status(400).json({message: error.message});
  }
};
