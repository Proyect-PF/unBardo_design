import {Request, Response} from 'express';
import {transporter} from "../../../config/mailer";

export const sendConfirmationEmailController = async (req: Request, res: Response) => {
    const {user} = req.body;
    try {
        await transporter.sendMail({
            from: '"unBardo_design" <unbardodesign2023@gmail.com>', // sender address
            to: user, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Bienvenido a nuestra plataforma, confirma tu cuenta para continuar</b>", // html body
        });
        res.status(200).send({message: 'El correo electrónico ha sido enviado correctamente'});
    } catch (error) {
        res.status(500).send({message: 'Error al enviar el correo electrónico'});
    }
};
export default sendConfirmationEmailController;
