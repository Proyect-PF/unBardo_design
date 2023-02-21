import express from 'express';

import {
    sendEmailByIdController,
    sendEmailToAllController,
    sendConfirmationEmailController,
}  from '../controllers/email/index';
import { verifyTokenIsAdmin } from '../helpers/verifyTokenIsAdmin';

/**
 //TODO: RUTA Enrutador para el envío de correos electrónicos.
 */
const emailRoutes = express.Router();

/**
 * 
 //TODO: RUTA Enviar un correo electrónico a todos los usuarios registrados.
 * @name Enviar correo electrónico a todos los usuarios
 * @route {POST} /all
 * @function
 */
emailRoutes.post('/all', sendEmailToAllController);

/**
//TODO: RUTA Enviar un correo electrónico de confirmación a un usuario por ID.
 *
 * @name Enviar correo electrónico de confirmación a un usuario
 * @route {POST} /confirmation/:id
 * @function
 *
 * @param {string} id - El ID del usuario que debe recibir el correo electrónico de confirmación.
 */
// emailRoutes.post('/confirmation', sendConfirmationEmailController);

/**
 //TODO: RUTA Enviar un correo electrónico a un usuario por ID.
 *
 * @name Enviar correo electrónico a un usuario
 * @route {POST} /
 * @function
 *
 * @param {string} id - El ID del usuario que debe recibir el correo electrónico.
 */
emailRoutes.post('/', sendEmailByIdController);

export default emailRoutes;
