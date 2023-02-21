import { Router } from 'express';
import db from '../database/database';

// Importa los enrutadores del módulo 'routes'.
import authRouter from './auth.routes';
import emailRoutes from './email.routes';
import ordersRoutes from './order.routes';
import productRoutes from './product.routes';
import userRoutes from './user.routes';
import favoritesRoutes from './favorite.routes'
import imageRoutes from "./image.routes";
import shipmentsRoutes from "./shipment.routes"
import statisticRoutes from "./statistic.routes";

// Define una función para el middleware de estadísticas
function trackStats(req:any, res:any, next:any) {
    db.Statistics.create({
        action_type: 'visit',
        path: req.originalUrl
    })
        .then(() => {
            next();
        })
        .catch((error:any) => {
            console.error('Error creating statistic:', error);
            next();
        });
}

// Crea una instancia de un enrutador de Express.
const index = Router();

// Usa la función del middleware de estadísticas
index.use(trackStats);

// Define las rutas para cada enrutador.
index.use('/auth', authRouter);
index.use('/email', emailRoutes);
index.use('/orders', ordersRoutes);
index.use('/products', productRoutes);
index.use('/users', userRoutes);
index.use('/favorites', favoritesRoutes);
index.use('/images', imageRoutes);
index.use('/shipments', shipmentsRoutes);
index.use('/statistics', statisticRoutes);

// Exporta el enrutador de índice para que pueda ser utilizado por otros módulos.
export default index;
