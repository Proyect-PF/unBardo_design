import { Router } from 'express';
import userRoutes from './User/routes';
import adminRoutes from './Admin/routes';


const routes = Router();

//Rutas de usuarios
 routes.use('/users', userRoutes);

routes.use("/admin", adminRoutes)



export default routes;

