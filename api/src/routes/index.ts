import { Router } from 'express';

// Importa los enrutadores del módulo 'routes'.
import authRouter from './auth.routes';
import emailRoutes from './email.routes';
import ordersRoutes from './order.routes';
import productRoutes from './product.routes';
import userRoutes from './user.routes';

// Crea una instancia de un enrutador de Express.
const index = Router();

// Define las rutas para cada enrutador.
index.use('/auth', authRouter);
index.use('/email', emailRoutes);
index.use('/orders', ordersRoutes);
index.use('/products', productRoutes);
index.use('/users', userRoutes);

// Exporta el enrutador de índice para que pueda ser utilizado por otros módulos.
export default index;
