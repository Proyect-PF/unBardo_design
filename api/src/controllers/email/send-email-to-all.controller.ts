import { Request, Response } from 'express';
import db from "../../database/database";
import { sendEmail } from "./send-email";

export const sendEmailToAllController = async (req: Request, res: Response) => {
    try {
        const users = await db.Users.getAllUsers();
        const { subject, text, html } = req.body;

        if (!subject || !text || !html) {
            return res.status(400).send({ message: 'Falta algún campo requerido en el cuerpo de la solicitud' });
        }

        let response;
        for (const user of users) {
            response = await sendEmail(user.email, subject, text, html);
        }
        res.status(200).send(response);
    } catch (error: any) {
        res.status(500).send({ message: 'Error al enviar el correo electrónico' });
    }
};
