import { Router } from 'express';
import userRoutes from './User/routes';
import productRoutes from './Product/routes'

const routes = Router();

//Ruta de usuarios
routes.use('/users', userRoutes);

//Ruta de productos
routes.use('/products', productRoutes);


export default routes;

