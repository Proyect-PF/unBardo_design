import { Router } from 'express';
import router from "Router";
import deleteProduct from "../controllers/deleteProduct";
import getProduct from '../controllers/getProduct';
import postProduct from '../controllers/postProduct';
import putProduct from "../controllers/putProductr";
import searchProduct from '../controllers/searchProduct';
import { getProductDetails, searchProducts } from './../../../../client/src/state/action-creators/index';

import getFilteredOrderProducts from "../controllers/controller_getFillteredOrderProducts";

router.delete('/', deleteProduct);

router.put("/",putProduct);

router.get("/", getProduct);

router.post("/", postProduct);

router.get("/search/:search", searchProduct);

router.get("/price/:byColor&:byOrder", getFilteredOrderProducts);
