//Controlers

import {Request, Response, response} from "express";
import db from "../../database";
import getErrorMessage from "../../helpers/handleErrorCatch";


export const GET_User = async (req: Request, res: Response) => {
    const users = await db.Users.findAll();
    res.send(users);
};

export const POST_User = async (req: Request, res: Response) => {
    try {
        const newUser = await db.Users.create(req.body);
        return res.status(201).json(newUser);

    } catch (error) {

        return res.status(400).json(getErrorMessage(error));
    }
};

export const UPDATE_User = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const {id} = req.params;
        console.log("id:", id);
        console.log("USER:", user);

        const [numberOfAffectedRows, affectedRows] = await db.Users.update(
            {
                fullname: user.fullname,
                email: user.email,
                password: user.password,

            },
            {
                where: {id: id},
                returning: true,
            }
        );
        console.log("AFECTED ROWS:", affectedRows[0]);
        console.log("AFECTED ROWS:", numberOfAffectedRows);

        // if (numberOfAffectedRows === 0) {
        //   throw new Error(`No user updated with id ${user.id}`);
        // }
        return res.status(200).json(affectedRows[0]);

        //TODO: STATUS => 201: Created, 204: No Content
    } catch (error) {
        return res.status(400).json(getErrorMessage(error)); //TODO: STATUS => 400: Bad Request
    }
};

export const DELETE_UserById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: 'EL ID del usuario es requerido'});
        }

        const user = await db.Users.findOne({where: {id: id}});

        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        const orders = await db.Orders.findAll({where: {id}});

        if (!orders.length) {
            await user.destroy();
            return res.status(200).json({message: 'El usuario ha sido eliminado'});
        }

        const orderProductIds = orders.map((Orders: any) => Orders.id);
        await db.OrderProducts.destroy({where: {id_order: orderProductIds}});
        await db.Orders.destroy({where: {id}});
        await user.destroy();

        return res.status(200).json({message: 'El usuario y los pedidos asociados han sido eliminados'});
    } catch (error) {
        return res.status(400).json(getErrorMessage(error));
    }
};

export const DELETE_AllUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.Users.findAll();

        if (!users.length) {
            return res.status(404).json({message: 'No se encontraron usuarios para eliminar'});
        }

        const userIds = users.map((user: any) => user.id);
        const orders = await db.Orders.findAll({where: {id_user: userIds}});

        if (orders.length) {
            const orderProductIds = orders.map((order: any) => order.id);
            await db.OrderProducts.destroy({where: {id_order: orderProductIds}});
            await db.Orders.destroy({where: {id_user: userIds}});
        }

        await db.Users.destroy({where: {}});

        return res.status(200).json({message: 'Todos los usuarios y sus pedidos asociados han sido eliminados'});
    } catch (error) {
        return res.status(400).json(getErrorMessage(error));
    }
};

