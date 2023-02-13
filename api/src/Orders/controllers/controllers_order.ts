import {Express, Request, Response} from "express";
import dotenv from 'dotenv'
import {Op} from "sequelize";
import db from "../../database";
import OrderProduct from "../../models/OrderProduct";
import Product from "../../models/Product";
import cloudinary from "../../utils/cloudinary";

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
        const orders = await db.Orders.findAll({
            where: {status: {[Op.ne]: 'cart'}},
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
export const GET_DetailsByOrderId = async (req: Request, res: Response) => {
    try {
        const {orderId} = req.params;

        // Ejecutar la primera consulta
        const order = await db.Orders.findOne({
            where: {id: orderId},
            attributes: ["id", "updatedAt", "status", "dispatched"],
            include: [{model: db.Users, as: "users", attributes: ["fullname", "email"]}],
            order: [['updatedAt', 'DESC']]
        });

        // Ejecutar la segunda consulta
        const orderProducts = await db.OrderProducts.findAll({
            where: {id_order: orderId},
            attributes: {exclude: ["createdAt", "updatedAt", "id_order"]}
        });

        // Extraer los valores de order y users
        const {id, updatedAt, status, dispatched} = order.dataValues;
        const {fullname, email} = order.users;
        // Combinar solo los valores necesarios
        const response = {
            id,
            updatedAt,
            status,
            dispatched,
            fullname,
            email
            ,
            orderProducts
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
        
        for (const ele of orderUser) {
            const prodOrder = await db.OrderProducts.findAll({
                where: {id_order: ele.id}
            })
            array.push({ele, product: prodOrder});
        }
        
        return response.status(200).json(array);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
}