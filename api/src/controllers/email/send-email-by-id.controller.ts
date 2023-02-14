import { Request, Response } from 'express';
import db from "../../database/database";
import { Op } from "sequelize";
import { sendEmail } from "./send-email";

export const sendEmailByIdController = async (req: Request, res: Response) => {
    try {
        const { ids, subject, text, html } = req.body;
        const users = await db.Users.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });
        for (const user of users) {
            await sendEmail(user.email, subject, text, html);
        }
        res.status(200).send({ message: 'Correo electrónico enviado con éxito a todos los destinatarios' });
    } catch (error: any) {
        res.status(500).send({ message: 'Error al enviar el correo electrónico' });
    }
};
