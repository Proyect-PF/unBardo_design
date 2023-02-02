import { Router } from 'express';
import deleteUser from '../controllers/deleteUser';
import postUser from '../controllers/postUser';
import getUser from '../controllers/getUser.route';
import updateUser from '../controllers/updateUser';

const userRoutes = Router();


//postUser
userRoutes.delete('/', deleteUser);

userRoutes.put("/", updateUser)

userRoutes.get("/", getUser)

userRoutes.post("/", postUser)






export default userRoutes;