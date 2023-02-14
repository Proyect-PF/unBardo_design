// IMPORTS
import { Router } from "express";

const productRoutes = Router();

import {
    DELETE_DeleteAllProducts, DELETE_DeleteProduct, GET_AllProducts, GET_ProductById, GET_SearchByName, POST_NewProduct,
    UPDATE_UpdateProduct
} from "../controllers/product.controller";


import { verifyTokenIsAdmin } from "../helpers/verifyTokenIsAdmin";





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



export default productRoutes;
