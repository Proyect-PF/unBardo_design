import {Router} from "express";
import {
    // DELETE_UserById,
    // DELETE_AllUsers,
    GET_Users,
    // POST_User,
    UPDATE_User,
    GET_UserById,
    updateNewsletterSubscription
} from "../controllers/user.controller";
import {verifyTokenIsAdmin} from "../helpers/verifyTokenIsAdmin";


const userRoutes = Router();


// userRoutes.delete("/:id", DELETE_UserById);
// userRoutes.delete("/", DELETE_AllUsers);
// userRoutes.post("/", POST_User);



/**
 //TODO: RUTA UPDATE actualiza los usuarios por medio del id
 */
userRoutes.put("/:id", UPDATE_User);

/**
 //TODO: RUTA GET Obtiene todos los usuarios
 */
userRoutes.get("/", GET_Users);

/**
 //TODO: RUTA GET Obtiene un usuario por id
 */
userRoutes.get("/:id_users", GET_UserById);

/**
 //TODO: RUTA UPDATE 
 */
userRoutes.put("/newsletter/subscription",updateNewsletterSubscription);

export default userRoutes;
