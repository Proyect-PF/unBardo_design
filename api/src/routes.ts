import { Router } from "express";
import categoryRoutes from "./Category/routes";
// import orderRoutes from "./Order/routes";
import ordersRoutes from "./Orders/routes/index";
import productRoutes from "./Product/routes";
import userRoutes from "./User/routes";
import emailRoutes from "./Email/routes";


import authRouter from "./User/routes/auth";

import cartRoutes from "./Cart/routes";

const routes = Router();

//END POINTS

//Ruta de usuarios
routes.use("/users", userRoutes);

//Ruta de productos
routes.use("/products", productRoutes);

//Ruta de Ordenes
routes.use("/orders", ordersRoutes);

// Ruta de email
routes.use("/email", emailRoutes);

//Ruta de Autorizacion
routes.use("/auth", authRouter)


//Ruta para el Carrito
routes.use("/Cart", cartRoutes);



// COMENTADA POR JOAQUIN
// NO SE SABE SI SE VAN A IMPLEMENTAR CATEGORIAS

// routes.use("/categories", categoryRoutes);

// Esta ruta es para probar las validaciones (Luego se borrara)
import validationsRoutes from "./validations/routes";
routes.use("/validations", validationsRoutes);

export default routes;
