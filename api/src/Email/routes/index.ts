import express from 'express';
const emailRoutes = express.Router();
import {
    sendEmailToAllController,
    sendConfirmationEmailController,
    sendEmailByIdController
} from '../controllers';

emailRoutes.post('/all', sendEmailToAllController);
emailRoutes.post('/confirmation/:id', sendConfirmationEmailController);
emailRoutes.post('/', sendEmailByIdController);

export default emailRoutes;
