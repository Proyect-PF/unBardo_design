import express from 'express';
import sendEmailController from '../controllers';

const emailRoutes = express.Router();

emailRoutes.post('/', sendEmailController);

export default emailRoutes;
