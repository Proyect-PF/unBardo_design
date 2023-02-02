import { Router } from 'express';
import userRoutes from './User/routes';

const routes = Router();

//Rutas de usuarios
routes.use('/users', userRoutes);




export default routes;

