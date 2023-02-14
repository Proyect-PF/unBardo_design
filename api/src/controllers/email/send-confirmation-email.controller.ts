import { Request, Response } from 'express';
import db from "../../database/database";
import { sendEmail } from "./send-email";

export const sendConfirmationEmailController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await db.Users.getUserById(id);
        const response = await sendEmail(user.email, "Confirma tu cuenta en nuestra plataforma", `Hola ${user.name},Gracias por registrarte en nuestra plataforma. Para completar tu registro, solo tienes que hacer clic en el siguiente enlace de confirmación:`, `<b>Bienvenido a nuestra plataforma, confirma tu cuenta para continuar</b>`);
        res.status(200).send(response);
    } catch (error: any) {
        res.status(500).send({ message: 'Error al enviar el correo electrónico' });
    }
};
