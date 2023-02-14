import { Router } from "express";
import ordersRoutes from "./order.routes";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";
import emailRoutes from "./email.routes";

import authRouter from "./auth.routes";

import cartRoutes from "./cart.routes";

const index = Router();

//END POINTS

//Ruta de usuarios
index.use("/users", userRoutes);

//Ruta de productos
index.use("/products", productRoutes);

//Ruta de Ordenes
index.use("/orders", ordersRoutes);

// Ruta de email
index.use("/email", emailRoutes);

//Ruta de Autorizacion
index.use("/auth", authRouter)


//Ruta para el Carrito
index.use("/Cart", cartRoutes);


// COMENTADA POR JOAQUIN
// NO SE SABE SI SE VAN A IMPLEMENTAR CATEGORIAS

// index.use("/categories", categoryRoutes);

// Esta ruta es para probar las validaciones (Luego se borrara)
import validationsRoutes from "../validations/routes";
index.use("/validations", validationsRoutes);

export default index;
