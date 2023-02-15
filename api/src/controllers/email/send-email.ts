import {transporter} from '../../config/mailer';

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    try {
        await transporter.sendMail({
            from: '"unBardo_design" <unbardodesign2023@gmail.com>',
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
