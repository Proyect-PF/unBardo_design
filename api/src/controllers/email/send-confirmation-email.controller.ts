import { Request, Response } from 'express';
import db from "../../database/database";
import { sendEmail } from "./send-email";

export const sendConfirmationEmailController = async (emailAddress: string, userId: number) => {
    try {
        const req = { body: { email: emailAddress } } as Request;
        const res = {status: (code: number) => ({send: (body: any) => ({code, body})})} as unknown as Response;

        const { email } = req.body;
        const response = await sendEmail(email, "¡Bienvenido a nuestro E-commerce!", `Hola, ¡Gracias por registrarte en nuestra plataforma! Nos complace tenerte como parte de nuestra comunidad. Encontrarás una amplia variedad de productos de alta calidad a precios competitivos. Esperamos que encuentres lo que buscas y que disfrutes tu experiencia de compra con nosotros.

¡Gracias por elegirnos y bienvenido a nuestro E-commerce!

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
              <p style="text-align: center; font-family: Arial, sans-serif; font-size: 16px; color: #333; margin: 20px;">Hola, ¡Gracias por registrarte en nuestra plataforma! Nos complace tenerte como parte de nuestra comunidad. Encontrarás una variedad de productos de alta calidad. Esperamos que encuentres lo que buscas y que disfrutes tu experiencia con nosotros.</p>

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