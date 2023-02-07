// controllers/orders.ts
import {Request, Response} from "express";
import db from "../../database";

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await db.Orders.findAll();
        return res.status(200).json(orders);
    } catch (error: any) {
        return res.status(400).json({message: error.message});
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

// Get an order by ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const order = await db.Orders.findOne({where: {id}});
        if (!order) {
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json(order);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message
        });
    }
};