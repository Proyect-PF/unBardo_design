import validateImageId from "../middlewares/validateImageId";
import deleteImage from "../controllers/deleteImage";
import postImage from "../controllers/postImage";
import updateImage from "../controllers/updateImage";
import getImages from "../controllers/getImages";
import {Router} from "express";

const imageRoutes = Router();

imageRoutes.delete("/:id", validateImageId, deleteImage);
imageRoutes.post("/", postImage);
imageRoutes.put("/:id", updateImage);
imageRoutes.get("/:id", getImages);

export default imageRoutes;