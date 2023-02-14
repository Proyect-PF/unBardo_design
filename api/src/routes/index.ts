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


export default index;
