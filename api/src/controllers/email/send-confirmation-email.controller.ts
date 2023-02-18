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

`, `<b>¡Bienvenido a nuestro E-commerce! Nos complace tenerte como parte de nuestra comunidad. Encontrarás una amplia variedad de productos de alta calidad a precios competitivos. Esperamos que encuentres lo que buscas y que disfrutes tu experiencia de compra con nosotros. ¡Gracias por elegirnos!</b>`);

        return res.status(200).send(response);
    } catch (error: any) {
        return {message: 'Error al enviar el correo electrónico'};
    }
};