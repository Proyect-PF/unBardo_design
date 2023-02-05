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
const productRoutes = Router();


productRoutes.delete('/', deleteProduct);

productRoutes.put("/",putProduct);

productRoutes.get("/", getProduct);

productRoutes.post("/", postProduct);

productRoutes.get("/search/:search", searchProduct);

productRoutes.get("/filterColor/:colour", filterByColors);


productRoutes.get("/price/:price", orderByPrice);

productRoutes.get("/images/:id", getImages);





export default productRoutes;