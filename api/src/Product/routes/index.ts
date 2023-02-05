// IMPORTS
import { Router } from 'express';
const productRoutes = Router();
// PRODUCT FUNCTIONS
import deleteProduct from '../controllers/deleteProduct';
import getProduct from '../controllers/getProduct';
import postProduct from '../controllers/postProduct';
import putProduct from '../controllers/putProductr';
// PRODUCTS LIST FUNCTIONS
import controller_getFillteredOrderProducts from "../controllers/controller_getFillteredOrderProducts";
import searchProduct from '../controllers/searchProduct';




import deleteImage from '../controllers/deleteImage';
import getImages from '../controllers/getImages';
import getVariants from "../controllers/getVariants";
import postImage from '../controllers/postImage';
import updateImage from '../controllers/updateImage';
import validateImageId from '../middleware/validateImageId';






// PRDUCT CRUD
productRoutes.get("/", getProduct);
productRoutes.delete('/', deleteProduct);
productRoutes.put("/",putProduct);
productRoutes.post("/", postProduct);
// PRODUCTS LIST OPERATIONS
productRoutes.get("/filtered/?", controller_getFillteredOrderProducts);
productRoutes.get("/search/:search", searchProduct)






productRoutes.delete("/images/:id", validateImageId, deleteImage);
productRoutes.post("/images", postImage);
productRoutes.put("/images/:id", updateImage);
productRoutes.get("/images/:id", getImages);

productRoutes.get("/variants/:id", getVariants);
//productRoutes.get("/price/:price", orderByPrice);
//productRoutes.get("/filterByCategories/:categoriId", filterByCategories);





export default productRoutes;
