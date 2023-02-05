import { Router } from 'express';
import postProduct from '../controllers/postProduct';
import getProduct from '../controllers/getProduct';
import putProduct from '../controllers/putProductr';
import deleteProduct from '../controllers/deleteProduct';
import searchProduct from '../controllers/searchProduct';
import filterByCategories from '../controllers/filterByCategories.controller';
import orderByPrice from '../controllers/orderByPrice';
import filterByColors from '../controllers/filterByColors';
import getImages from '../controllers/getImages';
import postImage from '../controllers/postImage';
import deleteImage from '../controllers/deleteImage';
import validateImageId from '../middleware/validateImageId';
import updateImage from '../controllers/updateImage';
import getVariants from "../controllers/getVariants";
const productRoutes = Router();


productRoutes.delete('/', deleteProduct);

productRoutes.put("/",putProduct);

productRoutes.get("/", getProduct);

productRoutes.post("/", postProduct);

productRoutes.get("/search/:search", searchProduct);

productRoutes.get("/filterColor/:colour", filterByColors);

productRoutes.get("/price/:price", orderByPrice);

productRoutes.get("/images/:id", getImages);

productRoutes.post("/images", postImage);

productRoutes.delete("/images/:id", validateImageId, deleteImage);
productRoutes.put("/images/:id", updateImage);

productRoutes.get("/variants/:id", getVariants);



export default productRoutes;