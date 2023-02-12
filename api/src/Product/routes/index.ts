// IMPORTS
import {Router} from "express";

const productRoutes = Router();

import {
    DELETE_DeleteProduct, DELETE_DeleteAllProducts, GET_AllProducts, GET_ProductById, GET_SearchByName, POST_NewProduct,
    UPDATE_UpdateProduct
} from "../controllers/controllers_product";


import getVariants from "../controllers/getVariants";
import {verifyTokenIsAdmin} from "../../helpers/verifyTokenIsAdmin";

//productRoutes.get("/:id", GET_AllProducts);


//productRoutes.get("/id/:id", GET_ProductById);


// PRODUCTS LIST OPERATIONS
//productRoutes.get("/filtered/?", GET_FillteredOrderProducts);

productRoutes.get("/", GET_AllProducts);
productRoutes.get("/:id", GET_ProductById);
productRoutes.put("/", UPDATE_UpdateProduct);

productRoutes.delete("/delete/:id", verifyTokenIsAdmin, DELETE_DeleteProduct);
productRoutes.delete("/deleteAll", verifyTokenIsAdmin, DELETE_DeleteAllProducts);


productRoutes.get("/search/:name", GET_SearchByName);

productRoutes.delete("/:id", verifyTokenIsAdmin, DELETE_DeleteProduct);


productRoutes.post("/", verifyTokenIsAdmin, POST_NewProduct);


//   ALEJANDRO EN REVISION POR JOAQUIN CARRERA


// EXPERIMENTAL ROUTE ....
productRoutes.get("/variants/:id", getVariants);

export default productRoutes;
