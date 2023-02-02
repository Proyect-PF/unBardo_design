import { Router } from 'express';
import postProduct from '../controllers/postProduct';
import getProduct from '../controllers/getProduct';
import putProduct from '../controllers/putProductr';
import deleteProduct from '../controllers/deleteProduct';

const productRoutes = Router();


//postUser
productRoutes.delete('/', deleteProduct);

productRoutes.put("/", putProduct)

productRoutes.get("/", getProduct)

productRoutes.post("/", postProduct)



export default productRoutes;