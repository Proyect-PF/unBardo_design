import { Router } from 'express';
import {POST_AddToCart} from '../controllers/cart.controller';


const cartRoutes = Router();


cartRoutes.post("/", POST_AddToCart);



export default cartRoutes;