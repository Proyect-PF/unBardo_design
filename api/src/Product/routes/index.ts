// IMPORTS
import { Router } from "express";
const productRoutes = Router();

import {
    DELETE_DeleteProduct, GET_AllProducts,
    GET_SearchByName, POST_NewProduct,
    UPDATE_UpdateProduct
} from "../controllers/controllers_product";

import deleteImage from "../controllers/deleteImage";
import getImages from "../controllers/getImages";
import getVariants from "../controllers/getVariants";
import postImage from "../controllers/postImage";
import updateImage from "../controllers/updateImage";
import validateImageId from "../middleware/validateImageId";

productRoutes.get("/", GET_AllProducts);
//productRoutes.get("/:id", GET_AllProducts);
productRoutes.get("/search/:name", GET_SearchByName);


//productRoutes.get("/id/:id", GET_ProductById);


// PRODUCTS LIST OPERATIONS
//productRoutes.get("/filtered/?", GET_FillteredOrderProducts);


productRoutes.delete("/:id", DELETE_DeleteProduct);


productRoutes.post("/new/", POST_NewProduct);

productRoutes.put("/update/", UPDATE_UpdateProduct);








//   ALEJANDRO EN REVISION POR JOAQUIN CARRERA


// IMAGES FOR PRODUCTS BY ID
productRoutes.delete("/images/:id", validateImageId, deleteImage);
productRoutes.post("/images", postImage);
productRoutes.put("/images/:id", updateImage);
productRoutes.get("/images/:id", getImages);





// EXPERIMENTAL ROUTE ....
productRoutes.get("/variants/:id", getVariants);


export default productRoutes;
