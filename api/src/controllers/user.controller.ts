//Controlers

import { Request, Response, response } from "express";
import db from "../database/database";
import getErrorMessage from "../helpers/handleErrorCatch";
import { TypeUser } from "../types";

export const GET_User = async (req: Request, res: Response) => {
  try {
    let { emails } = req.query;
    //true o false, me indica si quiero filtrar y obtener solo los usuarios
    if (emails === "true") {
      const usersEmails: TypeUser[] = await db.Users.findAll({
        where: { news_letter: true },
        attributes: {
          exclude: ["password", "id", "createdAt", "updatedAt", "id_role", "news_letter"],
        },
      });

      return res.send(usersEmails);
    }
    const users: TypeUser[] = await db.Users.findAll();
    return res.send(users);
  } catch (error) {
    return res.status(400).json(getErrorMessage(error));
  }
};

export const GET_UserById =async (req: Request, res: Response) => {
  try {
    const {id_users} = req.params;
    const userById = await db.Users.findAll({
      where: {id: id_users}
    })
    if (userById.length < 1) return response.status(400).send('No existe usuario con ese id');
    return res.status(200).json(userById);
  } catch (error: any) {
    return res.status(400).json({message: error.message});
  }
}

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
    const user: TypeUser = req.body;
    const { id } = req.params;

    const [numberOfAffectedRows, affectedRows] = await db.Users.update(
      {
        ...user,
        password: await db.Users.encryptPassword(user.password)
      },
      {
        where: { id: id },
        returning: true,
      }
    );
    if (numberOfAffectedRows === 0) {
      throw new Error(`No user updated with id ${user.id}`);
    }
    return res.status(200).json(affectedRows[0]);

    //TODO: STATUS => 201: Created, 204: No Content
  } catch (error) {
    return res.status(400).json(getErrorMessage(error)); //TODO: STATUS => 400: Bad Request
  }
};

export const DELETE_UserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "EL ID del usuario es requerido" });
    }

    const user = await db.Users.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const orders = await db.Orders.findAll({ where: { id } });

    if (!orders.length) {
      await user.destroy();
      return res.status(200).json({ message: "El usuario ha sido eliminado" });
    }

    const orderProductIds = orders.map((Orders: any) => Orders.id);
    await db.OrderProducts.destroy({ where: { id_order: orderProductIds } });
    await db.Orders.destroy({ where: { id } });
    await user.destroy();

    return res
      .status(200)
      .json({
        message: "El usuario y los pedidos asociados han sido eliminados",
      });
  } catch (error) {
    return res.status(400).json(getErrorMessage(error));
  }
};

export const DELETE_AllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.Users.findAll();

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios para eliminar" });
    }

    const userIds = users.map((user: any) => user.id);
    const orders = await db.Orders.findAll({ where: { id_user: userIds } });

    if (orders.length) {
      const orderProductIds = orders.map((order: any) => order.id);
      await db.OrderProducts.destroy({ where: { id_order: orderProductIds } });
      await db.Orders.destroy({ where: { id_user: userIds } });
    }

    await db.Users.destroy({ where: {} });

    return res
      .status(200)
      .json({
        message:
          "Todos los usuarios y sus pedidos asociados han sido eliminados",
      });
  } catch (error) {
    return res.status(400).json(getErrorMessage(error));
  }
};

export const updateNewsletterSubscription = async (req: Request, res: Response) => {
    try {
        const { email, newsletter } = req.body;
        const newsletterBool = newsletter === 'true';
        const user = await db.Users.findOne({ where: { email: email } });

        if (user) {
            const result = await user.update({ news_letter: newsletterBool });

            if (result) {
                res.status(200).json({ message: 'La suscripción a newsletter se actualizó correctamente.' });
            } else {
                res.status(500).json({ message: 'Ocurrió un error al actualizar la suscripción a newsletter.' });
            }
        } else {
            res.status(404).json({ message: 'No se encontró ningún usuario con el correo electrónico especificado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al actualizar la suscripción a newsletter.' });
    }
};