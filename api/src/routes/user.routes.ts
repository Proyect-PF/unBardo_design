import {Router} from "express";
import {
    DELETE_UserById,
    DELETE_AllUsers,
    GET_Users,
    POST_User,
    UPDATE_User,
    GET_UserById,
    updateNewsletterSubscription
} from "../controllers/user.controller";
import {verifyTokenIsAdmin} from "../helpers/verifyTokenIsAdmin";


const userRoutes = Router();

userRoutes.delete("/:id", DELETE_UserById);

userRoutes.delete("/", DELETE_AllUsers);

userRoutes.put("/:id", UPDATE_User);

userRoutes.get("/", GET_Users);

userRoutes.get("/:id_users", GET_UserById);

userRoutes.post("/", POST_User);

userRoutes.put("/newsletter/subscription", updateNewsletterSubscription);

export default userRoutes;
