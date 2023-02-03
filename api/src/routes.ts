import { Router } from 'express';
import userRoutes from './User/routes';
import adminRoutes from './Admin/routes';
import productRoutes from './Product/routes'


const routes = Router();
//Rutas de administradores
routes.use("/admins", adminRoutes)

//Ruta de usuarios
routes.use('/users', userRoutes);

//Ruta de productos
routes.use('/products', productRoutes);


export default routes;

