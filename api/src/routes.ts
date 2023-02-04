import { Router } from "express";
import userRoutes from "./User/routes";
import productRoutes from "./Product/routes";
import orderRoutes from "./Order/routes";
import categoryRoutes from "./Category/routes";

const routes = Router();


//Ruta de usuarios
routes.use("/users", userRoutes);



//Ruta de productos
routes.use("/products", productRoutes);



//Ruta de Ordenes
routes.use("/orders", orderRoutes);



routes.use("/categories", categoryRoutes);





export default routes;
