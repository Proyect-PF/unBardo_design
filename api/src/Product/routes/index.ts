import { Router } from 'express';
import controller_getFillteredOrderProducts from "../controllers/controller_getFillteredOrderProducts";
import deleteImage from '../controllers/deleteImage';
import deleteProduct from '../controllers/deleteProduct';
import filterByCategories from '../controllers/filterByCategories.controller';
import filterByColors from '../controllers/filterByColors';
import getImages from '../controllers/getImages';
import getProduct from '../controllers/getProduct';
import getVariants from "../controllers/getVariants";
import orderByPrice from '../controllers/orderByPrice';
import postImage from '../controllers/postImage';
import postProduct from '../controllers/postProduct';
import putProduct from '../controllers/putProductr';
import searchProduct from '../controllers/searchProduct';
import updateImage from '../controllers/updateImage';
import validateImageId from '../middleware/validateImageId';
const productRoutes = Router();


productRoutes.delete("/images/:id", validateImageId, deleteImage);
productRoutes.delete('/', deleteProduct);

productRoutes.put("/",putProduct);
productRoutes.put("/images/:id", updateImage);



productRoutes.get("/filtered/?", controller_getFillteredOrderProducts);
productRoutes.get("/images/:id", getImages);
productRoutes.get("/search/:search", searchProduct)
productRoutes.get("/variants/:id", getVariants);



 productRoutes.get("/", getProduct);
//productRoutes.get("/price/:price", orderByPrice);
//productRoutes.get("/filterByCategories/:categoriId", filterByCategories);





productRoutes.post("/", postProduct);
productRoutes.post("/images", postImage);




export default productRoutes;
