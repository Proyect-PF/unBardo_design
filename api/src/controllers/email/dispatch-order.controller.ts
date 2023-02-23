import { Request, Response } from 'express';
import db from "../../database/database";
import { sendEmail } from "./send-email";

export const sendDispatchConfirmationEmailController = async (emailAddress: string, orderId: number) => {
    try {
        const req = { body: { email: emailAddress } } as Request;
        const res = {status: (code: number) => ({send: (body: any) => ({code, body})})} as unknown as Response;

        const { email } = req.body;
        const response = await sendEmail(email, "¡Orden despachada!", `Hola, ¡Tu orden ha sido despachada! Esperamos que disfrutes tus productos. ¡Gracias por elegirnos!

        `, `
          <html>
            <head>
              <style>
                /* Agregar estilos CSS aquí */
              </style>
            </head>
            <body>
              <!-- Header -->
              <img src="http://res.cloudinary.com/drt1pzx1x/image/upload/v1677079018/unbardo/lve8p5ftmyntqhbl2sox.png" alt="Header" style="display: block; margin: 0 auto; max-width: 100%;">

              <!-- Contenido del correo -->
              <p style="text-align: center; font-family: Arial, sans-serif; font-size: 16px; color: #333; margin: 20px;">Hola, ¡Tu orden ha sido despachada! Esperamos que disfrutes tus productos. ¡Gracias por elegirnos!</p>

              <!-- Footer -->
              <img src="http://res.cloudinary.com/drt1pzx1x/image/upload/v1677079018/unbardo/zccuacq4vaplvpg60z50.png" alt="Footer" style="display: block; margin: 0 auto; max-width: 100%;">
            </body>
          </html>
        `);

        return res.status(200).send(response);
    } catch (error: any) {
        return {message: 'Error al enviar el correo electrónico'};
    }
};
