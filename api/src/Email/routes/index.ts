import express from 'express';
import sendConfirmationEmailController from '../controllers';

const emailRoutes = express.Router();

emailRoutes.post('/confirmation', sendConfirmationEmailController);

export default emailRoutes;
