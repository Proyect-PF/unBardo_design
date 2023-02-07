import { Router } from "express";
import categoryRoutes from "./Category/routes";
// import orderRoutes from "./Order/routes";
import ordersRoutes from "./Orders/routes/index";
import productRoutes from "./Product/routes";
import userRoutes from "./User/routes";
const routes = Router();


//END POINTS

//Ruta de usuarios
routes.use("/users", userRoutes);

//Ruta de productos
routes.use("/products", productRoutes);

//Ruta de Ordenes
routes.use("/orders", ordersRoutes);



// COMENTADA POR JOAQUIN
// NO SE SABE SI SE VAN A IMPLEMENTAR CATEGORIAS

// routes.use("/categories", categoryRoutes);




export default routes;
