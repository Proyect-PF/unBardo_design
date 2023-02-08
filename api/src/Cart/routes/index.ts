import { Router } from 'express';
// import deleteUser from '../controllers/deleteUser';
import {POST_AddToCart} from '../controllers/controllers_cart';
// import getUser from '../controllers/getUser.route';
// import updateUser from '../controllers/updateUser';

const cartRoutes = Router();


//postUser
// userRoutes.delete('/', deleteUser);

// userRoutes.put("/", updateUser)

// userRoutes.get("/", getUser)

cartRoutes.post("/", POST_AddToCart);






export default cartRoutes;