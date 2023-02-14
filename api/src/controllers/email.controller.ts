// import {Request, Response} from 'express';
// import {transporter} from "../../../config/mailer";
//
// export const sendEmailController = async (req: Request, res: Response) => {
//     const {user, subject, text, html} = req.body;
//     try {
//         await transporter.sendMail({
//             from: '"unBardo_design" <unbardodesign2023@gmail.com>', // sender address
//             to: user, // list of receivers
//             subject: subject || "Hello ✔", // Subject line
//             text: text || "Hello world?", // plain text body
//             html: html || "<b>Bienvenido a nuestra plataforma, confirma tu cuenta para continuar</b>", // html body
//         });
//         res.status(200).send({message: 'El correo electrónico ha sido enviado correctamente'});
//     } catch (error) {
//         res.status(500).send({message: 'Error al enviar el correo electrónico'});
//     }
// };
// export default sendEmailController;
import {transporter} from "../config/mailer";
import {Request, Response} from 'express';
import db from "../database/database";
import {Op} from "sequelize";
export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    try {
        await transporter.sendMail({
            from: '"unBardo_design" <unbardodesign2023@gmail.com>', // sender address
            to: to,
            subject: subject,
            text: text,
            html: html,
        });
        return {message: 'El correo electrónico ha sido enviado correctamente'};
    } catch (error) {
        return {message: 'Error al enviar el correo electrónico'};
    }
};

const sendConfirmationEmailController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await db.Users.getUserById(id);
        const response = await sendEmail(user.email, "Confirma tu cuenta en nuestra plataforma", `Hola ${user.name},Gracias por registrarte en nuestra plataforma. Para completar tu registro, solo tienes que hacer clic en el siguiente enlace de confirmación:`, `<b>Bienvenido a nuestra plataforma, confirma tu cuenta para continuar</b>`);
        res.status(200).send(response);
    } catch (error: any) {
        res.status(500).send({message: 'Error al enviar el correo electrónico'});
    }
};


const sendEmailToAllController = async (req: Request, res: Response) => {
    try {
        const users = await db.Users.getAllUsers();
        const {subject, text, html} = req.body;

        if (!subject || !text || !html) {
            return res.status(400).send({message: 'Falta algún campo requerido en el cuerpo de la solicitud'});
        }

        let response;
        for (const user of users) {
            response = await sendEmail(user.email, subject, text, html);
        }
        res.status(200).send(response);
    } catch (error: any) {
        res.status(500).send({message: 'Error al enviar el correo electrónico'});
    }
};



const sendEmailByIdController = async (req: Request, res: Response) => {
    try {
        const {ids, subject, text, html} = req.body;
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
        res.status(200).send({message: 'Correo electrónico enviado con éxito a todos los destinatarios'});
    } catch (error: any) {
        res.status(500).send({message: 'Error al enviar el correo electrónico'});
    }
};


export {sendConfirmationEmailController, sendEmailToAllController, sendEmailByIdController};
