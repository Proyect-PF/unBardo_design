// IMPORTS
import { Router } from "express";
const productRoutes = Router();

import {
    DELETE_DeleteProduct, GET_AllProducts, GET_ProductById, GET_SearchByName, POST_NewProduct,
    UPDATE_UpdateProduct
} from "../controllers/controllers_product";

import deleteImage from "../controllers/deleteImage";
import getImages from "../controllers/getImages";
import getVariants from "../controllers/getVariants";
import postImage from "../controllers/postImage";
import updateImage from "../controllers/updateImage";
import validateImageId from "../middleware/validateImageId";
import { verifyTokenIsAdmin } from "../../helpers/verifyTokenIsAdmin";

//productRoutes.get("/:id", GET_AllProducts);



//productRoutes.get("/id/:id", GET_ProductById);


// PRODUCTS LIST OPERATIONS
//productRoutes.get("/filtered/?", GET_FillteredOrderProducts);

productRoutes.get("/", GET_AllProducts);
productRoutes.get("/:id", GET_ProductById);
productRoutes.put("/", UPDATE_UpdateProduct);

//productRoutes.delete("/delete/:id", verifyTokenIsAdmin,DELETE_DeleteProduct);
productRoutes.delete("/delete/:id", DELETE_DeleteProduct);


productRoutes.get("/search/:name", GET_SearchByName);

//productRoutes.delete("/:id", verifyTokenIsAdmin,DELETE_DeleteProduct);
productRoutes.delete("/:id", DELETE_DeleteProduct);


productRoutes.post("/", POST_NewProduct);
//productRoutes.post("/",verifyTokenIsAdmin, POST_NewProduct);









//   ALEJANDRO EN REVISION POR JOAQUIN CARRERA

// IMAGES FOR PRODUCTS BY ID
productRoutes.delete("/images/:id", validateImageId, deleteImage);
productRoutes.post("/images", postImage);
productRoutes.put("/images/:id", updateImage);
productRoutes.get("/images/:id", getImages);

// EXPERIMENTAL ROUTE ....
productRoutes.get("/variants/:id", getVariants);

export default productRoutes;
