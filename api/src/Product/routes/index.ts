import { Router } from 'express';
import postProduct from '../controllers/postProduct';
import getProduct from '../controllers/getProduct';
import putProduct from '../controllers/putProductr';
import deleteProduct from '../controllers/deleteProduct';
import searchProduct from '../controllers/searchProduct';
import orderByPrice from '../controllers/orderByPrice';

const productRoutes = Router();


productRoutes.delete('/', deleteProduct);

productRoutes.put("/",putProduct);

productRoutes.get("/", getProduct);

productRoutes.post("/", postProduct);

productRoutes.get("/search/:search", searchProduct);

productRoutes.get("/filterColor/:colour", searchProduct);

productRoutes.get("/price/:price", orderByPrice);





export default productRoutes;