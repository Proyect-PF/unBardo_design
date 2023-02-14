import express from 'express';

import {
    sendEmailByIdController,
    sendEmailToAllController,
    sendConfirmationEmailController,
}  from '../controllers/email/index';

/**
 * Enrutador para el envío de correos electrónicos.
 */
const emailRoutes = express.Router();

/**
 * Enviar un correo electrónico a todos los usuarios registrados.
 *
 * @name Enviar correo electrónico a todos los usuarios
 * @route {POST} /all
 * @function
 */
emailRoutes.post('/all', sendEmailToAllController);

/**
 * Enviar un correo electrónico de confirmación a un usuario por ID.
 *
 * @name Enviar correo electrónico de confirmación a un usuario
 * @route {POST} /confirmation/:id
 * @function
 *
 * @param {string} id - El ID del usuario que debe recibir el correo electrónico de confirmación.
 */
emailRoutes.post('/confirmation/:id', sendConfirmationEmailController);

/**
 * Enviar un correo electrónico a un usuario por ID.
 *
 * @name Enviar correo electrónico a un usuario
 * @route {POST} /
 * @function
 *
 * @param {string} id - El ID del usuario que debe recibir el correo electrónico.
 */
emailRoutes.post('/', sendEmailByIdController);

export default emailRoutes;
