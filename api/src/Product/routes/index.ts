// IMPORTS
import { Router } from "express";

const productRoutes = Router();

import {
    DELETE_DeleteAllProducts, DELETE_DeleteProduct, GET_AllProducts, GET_ProductById, GET_SearchByName, POST_NewProduct,
    UPDATE_UpdateProduct
} from "../controllers/controllers_product";


import { verifyTokenIsAdmin } from "../../helpers/verifyTokenIsAdmin";
import getVariants from "../controllers/getVariants";

//productRoutes.get("/:id", GET_AllProducts);


//productRoutes.get("/id/:id", GET_ProductById);


// PRODUCTS LIST OPERATIONS
//productRoutes.get("/filtered/?", GET_FillteredOrderProducts);

productRoutes.get("/", GET_AllProducts);
productRoutes.get("/:id", GET_ProductById);
productRoutes.put("/", UPDATE_UpdateProduct);

productRoutes.delete("/delete/:id", DELETE_DeleteProduct);
productRoutes.delete("/deleteAll",  DELETE_DeleteAllProducts);


productRoutes.get("/search/:name", GET_SearchByName);

productRoutes.delete("/:id", DELETE_DeleteProduct);


productRoutes.post("/", POST_NewProduct);


//   ALEJANDRO EN REVISION POR JOAQUIN CARRERA


// EXPERIMENTAL ROUTE ....
productRoutes.get("/variants/:id", getVariants);

export default productRoutes;
