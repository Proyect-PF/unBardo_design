import {Request, Response} from 'express';
import {transporter} from "../../../config/mailer";

export const sendEmailController = async (req: Request, res: Response) => {
    const {user, subject, text, html} = req.body;
    try {
        await transporter.sendMail({
            from: '"unBardo_design" <unbardodesign2023@gmail.com>', // sender address
            to: user, // list of receivers
            subject: subject || "Hello ✔", // Subject line
            text: text || "Hello world?", // plain text body
            html: html || "<b>Bienvenido a nuestra plataforma, confirma tu cuenta para continuar</b>", // html body
        });
        res.status(200).send({message: 'El correo electrónico ha sido enviado correctamente'});
    } catch (error) {
        res.status(500).send({message: 'Error al enviar el correo electrónico'});
    }
};
export default sendEmailController;
