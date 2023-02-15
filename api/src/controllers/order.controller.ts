import {Express, Request, Response} from "express";
import dotenv from 'dotenv'
import {Op} from "sequelize";
import db from "../database/database";
import OrderProduct from "../database/models/order-product.model";
import Product from "../database/models/product.model";
import cloudinary from "../utils/cloudinary";
import axios from "axios";

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {}

//Ruta POST para la creacion de la orden de compra
export const POST_Order = async (request: Request, response: Response) => {
    try {
        const {id_user, products} = request.body;

        //----------------------------------------------------
        //TODO: Analiza si existe otra orden de compra con estado status "cart", y si existe la elimina, antes de crear la nueva orden con status "cart". De esta forma siempre va a existir solo un carrito por usuario
        const order = await db.Orders.findOne({
            where: {
                id_user,
                status: 'cart'
            }
        });
        if (order!) {
            await db.OrderProducts.destroy({
                where: {
                    id_order: order.id
                }
            });
            await order.destroy();
        }
        //----------------------------------------------------

        const createdOrder = await db.Orders.create({
            id_user,
            status: "cart",
        });
        const createdOrderProducts = [];
        for (const product of products) {
            const {id_product, sizes} = product;
            const createdOrderProduct = await db.OrderProducts.create({
                id_order: createdOrder.id,
                id_product,
                sizes
            });
            createdOrderProducts.push(createdOrderProduct);
        }
        return response.status(201).json({createdOrder, createdOrderProducts});
    } catch (error: any) {
        console.error(error);
        return response.status(400).json({error: error.message});
    }
};

//Obtener todas las ordenes
export const GET_AllOrders = async (req: Request, res: Response) => {
    try {
        const { page, limit, sort, order, status, userId, id, paymentId, dispatched, startDate, endDate, search, minPrice, maxPrice } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const options: any = {
            where: {},
            include: [
                {
                    model: db.Users,
                    as: "users"
                }
            ],
            order: []
        };

        // Verificar si status es una cadena de texto
        if (typeof status === 'string') {
            options.where.status = status;
        } else {
            options.where.status = {[Op.ne]: 'cart'};
        }

        // Verificar si userId es una cadena de texto
        if (typeof userId === 'string') {
            options.where.id_user = userId;
        }

        // Verificar si id es una cadena de texto
        if (typeof id === 'string') {
            options.where.id = id;
        }

        // Verificar si paymentId es una cadena de texto
        if (typeof paymentId === 'string') {
            options.where.payment_id = paymentId;
        }

        // Verificar si dispatched es una cadena de texto
        if (typeof dispatched === 'string') {
            options.where.dispatched = dispatched === 'true';
        }

        // Verificar si startDate y endDate son cadenas de texto
        if (typeof startDate === 'string' && typeof endDate === 'string') {
            options.where.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        // Verificar si sort y order son cadenas de texto o arrays
        if (typeof sort === 'string' && (typeof order === 'string' || Array.isArray(order))) {
            if (Array.isArray(order)) {
                options.order.push(order.map(o => [sort, o.toString().toUpperCase()]));
            } else {
                options.order.push([sort, order.toUpperCase()]);
            }
        } else {
            options.order.push(['createdAt', 'DESC']);
        }

        // Verificar si page y limit son números
        if (typeof page === 'string' && typeof limit === 'string') {
            options.limit = Number(limit);
            options.offset = offset;
        }

        // Verificar si se está filtrando por rango de precio mínimo y máximo
        if (typeof minPrice === 'string' && typeof maxPrice === 'string') {
            const min = Number(minPrice);
            const max = Number(maxPrice);

            if (min > 0 && max > 0) {
                options.include.push({
                    model: db.Product,
                    as: "products",
                    where: {
                        price: { [Op.between]: [min, max] }
                    }
                });
            }
        }

        // Verificar si se está realizando una búsqueda global
        if (typeof search === "string") {
            const searchString = search.trim();

            options.where[Op.or] = [
                db.Sequelize.literal(
                    `concat("Orders"."id", "Orders"."id_user", "Orders"."status", "Orders"."payment_id", "Orders"."dispatched"::text, "Orders"."createdAt", "Orders"."updatedAt") ILIKE '%${searchString}%'`
                ),
                {
                    "$users.email$": {
                        [Op.iLike]: `%${searchString}%`,
                    },
                },
                {
                    "$products.name$": {
                        [Op.iLike]: `%${searchString}%`,
                    },
                },
            ];
        }

        const orders = await db.Orders.findAll(options);
        return res.status(200).json({ orders });
    } catch (error: any) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
};

// Obtener oden por ID
export const GET_DetailsByOrderId = async (req: Request, res: Response) => {
    try {
        const {orderId} = req.params;

        // Ejecutar la primera consulta
        const order = await db.Orders.findOne({
            where: {id: orderId},
            attributes: ["id", "updatedAt", "status", "dispatched", "payment_id"],
            include: [{model: db.Users, as: "users", attributes: ["fullname", "email"]}],
            order: [['updatedAt', 'DESC']]
        });

        // Ejecutar la segunda consulta
        const orderProducts = await db.OrderProducts.findAll({
            where: {id_order: orderId},
            attributes: {exclude: ["createdAt", "updatedAt", "id_order"]}
        });
        
        //Se obtiene de la api de Mercadopago la informacion de la compra por medio del payment_id
        const payment_detail = await axios.get(`https://api.mercadopago.com/v1/payments/${order.payment_id}`,
        {
            headers: {
                "Content-types": "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_KEY}`
            },
        });

        //A la informacion del producto se le agrega titulo, descripción y precio unitario obtenido desde la api de Mercadopago

        let products = [];
        for (let i = 0; i < orderProducts.length; i++) {
            products.push({
                id: orderProducts[i].id,
                id_product: orderProducts[i].id_product,
                title: payment_detail.data.additional_info.items[i].title,
                description: payment_detail.data.additional_info.items[i].description,
                unit_price: payment_detail.data.additional_info.items[i].unit_price,
                sizes: orderProducts[i].sizes,
            });
        }

        // Extraer los valores de order y users
        const {id, updatedAt, status, dispatched, payment_id} = order.dataValues;
        const {fullname, email} = order.users;
        // Combinar solo los valores necesarios
        const response = {
            id,
            payment_id,
            updatedAt,
            status,
            dispatched,
            fullname,
            email,
            //orderProducts,
            payment_method: payment_detail.data.payment_method_id,
            payment_type: payment_detail.data.payment_type_id,
            total_amount: payment_detail.data.transaction_amount,
            cuotes: payment_detail.data.installments,
            total_paid_amount: payment_detail.data.transaction_details.total_paid_amount,
            products,
        };

        // Enviar la respuesta
        res.json(response);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        });
    }
};

//Update el estado de la orden
export const UPDATE_OrderStatus = async (req: Request, res: Response) => {
    try {

        const {id, status} = req.query;

        const order = await db.Orders.findOne({
            where: {id}
        })

        if (order.status === 'approved') {
            const orderUpdate = await db.Orders.update({
                dispatched: Boolean(status),
            }, {
                where: {
                    id
                }
            });
            console.log(orderUpdate);
            if (!orderUpdate) return res.status(404).json({message: "Orden no encontrada"});
            return res.status(200).json(orderUpdate);
        }

        return res.status(404).json({message: "El estado de la orden debe estar aprobada"});
    } catch (error: any) {
        return res.status(400).json({message: error.message});
    }
}

export const DELETE_Order = async (request: Request, response: Response) => {
    try {
        const {id} = request.params;
        const order = await db.Orders.findByPk(id);
        if (!order) {
            throw new Error(`Orden con el ${id} no encontrada`);
        }
        const orderProducts = await db.OrderProducts.findAll({
            where: {
                id_order: id
            }
        });
        await db.OrderProducts.destroy({
            where: {
                id_order: id
            }
        });
        await order.destroy();
        return response.status(200).json({message: 'Order y order products eliminados correctamente'});
    } catch (error: any) {
        console.error(error);
        return response.status(400).json({error: error.message});
    }
};

export const DELETE_AllOrders = async (request: Request, response: Response) => {
    try {
        const deletedOrders = await db.Orders.destroy({ where: {} });
        await db.OrderProducts.destroy({ where: {} });
        return response.status(200).json({ message: 'Todas las órdenes y sus productos asociados han sido eliminados correctamente.' });
    } catch (error: any) {
        console.error(error);
        return response.status(500).json({ error: error.message });
    }
};

export const GET_OrderByUser = async (request: Request, response: Response) => {
    try {
        const {id_user} = request.params;
        let array = [];
        const orderUser = await db.Orders.findAll({
            where: {
                id_user,
                status: {[Op.ne]: 'cart'}
             },
        });

        for (const order of orderUser) {
            const prodOrder = await db.OrderProducts.findAll({
                where: {id_order: order.id}
            })
            array.push({
                id: order.id,
                id_user: order.id_user,
                status: order.status,
                payment_id: order.payment_id,
                dispatched: order.dispatched,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt, 
                product: prodOrder
            });
        }

        return response.status(200).json(array);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
}