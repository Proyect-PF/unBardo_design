import { Router } from "express";
import categoryRoutes from "./Category/routes";
import orderRoutes from "./Order/routes";
import productRoutes from "./Product/routes";
import userRoutes from "./User/routes";
const routes = Router();


//Ruta de usuarios
routes.use("/users", userRoutes);

//Ruta de productos
routes.use("/products", productRoutes);

//Ruta de Ordenes
routes.use("/orders", orderRoutes);



routes.use("/categories", categoryRoutes);




export default routes;
