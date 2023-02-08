import { Router } from "express";
import {
  DELETE_User,
  GET_User,
  GET_UserByName,
  POST_User,
  UPDATE_User,
} from "../controllers/controllers_user";
import { verifyTokenIsAdmin } from "../../helpers/verifyTokenIsAdmin";


const userRoutes = Router();


userRoutes.delete("/", DELETE_User);



userRoutes.put("/", UPDATE_User);

userRoutes.get("/", GET_User);

userRoutes.post("/",POST_User);

export default userRoutes;
