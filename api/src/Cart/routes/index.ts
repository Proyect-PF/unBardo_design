import { Router } from 'express';
import {POST_AddToCart} from '../controllers/controllers_cart';


const cartRoutes = Router();


cartRoutes.post("/", POST_AddToCart);



export default cartRoutes;