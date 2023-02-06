// IMPORTS
import { Router } from 'express';
const productRoutes = Router();

import { GET_AllProducts, GET_FillteredOrderProducts, GET_ProductById, GET_SearchByName, POST_NewProduct } from "../controllers/controllers_product";
// PRODUCT FUNCTIONS
import deleteProduct from '../controllers/deleteProduct';
import getProduct from '../controllers/getProduct';
// PRODUCTS LIST FUNCTIONS
//import controller_getFillteredOrderProducts from "../controllers/controller_getFillteredOrderProducts";
import searchProduct from '../controllers/searchProduct';

import deleteImage from '../controllers/deleteImage';
import getImages from '../controllers/getImages';
import getVariants from "../controllers/getVariants";
import postImage from '../controllers/postImage';
import updateImage from '../controllers/updateImage';
import validateImageId from '../middleware/validateImageId';

// PRDUCT CRUD
productRoutes.get("/", GET_AllProducts)
productRoutes.get("/id/:id", GET_ProductById);
productRoutes.delete('/delete/:id', deleteProduct);
productRoutes.post("/new/", POST_NewProduct);


// PRODUCTS LIST OPERATIONS
productRoutes.get("/filtered/?", GET_FillteredOrderProducts);
productRoutes.get("/search/:name", GET_SearchByName)


productRoutes.delete("/images/:id", validateImageId, deleteImage);
productRoutes.post("/images", postImage);
productRoutes.put("/images/:id", updateImage);
productRoutes.get("/images/:id", getImages);

productRoutes.get("/variants/:id", getVariants);
//productRoutes.get("/price/:price", orderByPrice);
//productRoutes.get("/filterByCategories/:categoriId", filterByCategories);





export default productRoutes;
