import { Request, Response } from 'express';
import db from "../../database/database";
import { sendEmail } from "./send-email";

export const sendConfirmationEmailController = async (emailAddress: string, userId: number) => {
    try {
        const req = { body: { email: emailAddress } } as Request;
        const res = {status: (code: number) => ({send: (body: any) => ({code, body})})} as unknown as Response;

        const { email } = req.body;
        const response = await sendEmail(email, "Confirma tu cuenta en nuestra plataforma", `Hola, Gracias por registrarte en nuestra plataforma. Para completar tu registro, solo tienes que hacer clic en el siguiente enlace de confirmación: http://localhost:3000/confirm-account/${userId}`, `<b>Bienvenido a nuestra plataforma, confirma tu cuenta para continuar</b>`);
        return res.status(200).send(response);
    } catch (error: any) {
        return {message: 'Error al enviar el correo electrónico'};
    }
};
