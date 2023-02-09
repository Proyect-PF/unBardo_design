import { NextFunction, Request, Response } from 'express';
import db from '../database';

const validateOrder = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.body.id;
    const quantity = request.body.quantity;
    const customerId = request.body.id_user;

    if (!id) {
        return response.status(400).json({ message: 'El ID del producto es requerido' });
    }

    if (!quantity) {
        return response.status(400).json({ message: 'La cantidad es requerida' });
    }

    if (isNaN(quantity)) {
        return response.status(400).json({ message: 'La cantidad debe ser un número' });
    }

    if (quantity <= 0) {
        return response.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
    }

    if (!Number.isInteger(quantity)) {
        return response.status(400).json({ message: 'La cantidad debe ser un entero' });
    }

    const product = await db.Product.findByPk(id);

    if (!product) {
        return response.status(400).json({ message: 'Producto no encontrado' });
    }

    if (product.stock < quantity) {
        return response.status(400).json({ message: 'No hay suficiente stock disponible' });
    }

    if (!customerId) {
        return response.status(400).json({ message: 'El ID del cliente es requerido' });
    }

    const customer = await db.Users.findByPk(request.body.id_user);

    if (!customer) {
        return response.status(400).json({ message: 'Cliente no encontrado' });
    }

    next();
};


export default validateOrder;

