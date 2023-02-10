import {Express, Request, Response} from "express";
import dotenv from 'dotenv'
import {Op} from "sequelize";
import db from "../../database";
import OrderProduct from "../../models/OrderProduct";
import Product from "../../models/Product";
import cloudinary from "../../utils/cloudinary";

const mercadopago = require('mercadopago');
dotenv.config();

//MERCADOPAGO
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_KEY,
    //access_token: "APP_USR-4964430421416242-020813-c46f247ea7b1f91937c722b8ea7b4134-1305644016",
});

interface RequestParams {
}

interface ResponseBody {
}

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
    id_user: number;    //id de usuario
}

interface RequestQuery {
}

export const POST_Order = async (request: Request, response: Response) => {
    try {
        const { id_user, products } = request.body;
        const createdOrder = await db.Orders.create({
            id_user,
            status: "cart",
        });
        const createdOrderProducts = [];
        for (const product of products) {
            const { id_product, sizes } = product;
            const createdOrderProduct = await db.OrderProducts.create({
                id_order: createdOrder.id,
                id_product,
                sizes
            });
            createdOrderProducts.push(createdOrderProduct);
        }
        return response.status(201).json({ createdOrder, createdOrderProducts });
    } catch (error:any) {
        console.error(error);
        return response.status(400).json({ error: error.message });
    }
};

//Obtener todas las ordenes
export const GET_AllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await db.Orders.findAll({
            where: { status: { [Op.ne]: 'cart' } },
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
                    as: "users"
                }
            ]
        });
        if (!order) {
            return res.status(404).json({message: "Orden no encontrada"});
        }
        return res.status(200).json(order);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        });
    }
};

//Update el estado de la orden
export const UPDATE_OrderStatus =async (req: Request, res: Response) => {
    try {
        
        const {id, status} = req.query;
        
        const orderUpdate = await db.Orders.update({
            status: status,
        },{
            where: {
                id
            }
        });
        console.log(orderUpdate);
        
        if (!orderUpdate) return res.status(404).json({message: "Orden no encontrada"});
        return res.status(200).json(orderUpdate);
    } catch (error: any) {
        return res.status(400).json({message: error.message});
    }
}


//Obtiene la ultima orden generada por el usuario => para usar en MERCADOPAGO
const GET_OrderLast = async (id_user: number) => {
    try {
        const lastOrder = await db.Orders.findOne({
            where: {id_user},
            order: [ [ 'id', 'DESC' ]],
            });
        return lastOrder;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//Obtiene la informacion del usuario relacionada a la orden de compra => para usar en MERCADOPAGO
const GET_OrderUser = async (id: number) => {
    try {
        const orderUser = await db.Orders.findOne({
            where: {id},
            include: [
                {
                    model: db.Users,
                    as: "users",
                }
            ]
        });
        return orderUser;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//Obtiene la informacion de los productos de la orden
const GET_OrderDescription = async (id_order: number) => {
    try {
        const orderUser = await db.OrderProducts.findOne({
            where: {id_order}
        });
        return orderUser;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//MERCADOPAGO
export const POST_GeneratePayment = async (
    request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
    response: Response
) => {
    const prod = request.body;

    //TODO: Se utiliza el id del usuario que se obtiene por body para obtener la información de la ultima orden del usuario
    const last = await GET_OrderLast(prod.id_user)
    console.log(last.id);
    //TODO: Se utiliza el id de la orden de compra como referencia externa para mercado pago. Esta referencia externa es la que permite conectar la información que se utiliza en el POST de mercadopago con la recibida al finalizar la compra y así poder obtener el estado de la compra
    const external_reference = last.id.toString();
    console.log(external_reference);

    const userInfo = await GET_OrderUser(last.id);
    console.log(userInfo.users.fullname);
    console.log(userInfo.users.email);

    const prodInfo = await GET_OrderDescription(last.id);
    console.log(prodInfo.sizes);
    console.log(prodInfo.id_product);
    
    
    
    

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
            "success": "http://localhost:3700/payment",
            "failure": "http://localhost:3700/payment",
            "pending": ""
        },
        //auto_return: "approved",
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
export const GET_FeedbackPayment = async (
    request: Request,
    response: Response
) => {
    const feedback = request.query;
    console.log(feedback);
    const orderUpdate = await db.Orders.update({
        status: feedback.status,
    },{
        where: {
            id: feedback.external_reference
        }
    })

    response.status(200).json({
        orderUpdate,
        Payment: feedback.payment_id,
        Status: feedback.status,
        MerchantOrder: feedback.merchant_order_id,
        external_reference: feedback.external_reference
    });
}

