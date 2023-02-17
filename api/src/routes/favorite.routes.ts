import { Router } from "express";
const favoritesRoutes = Router();

import {
    POST_Favorite,
    GET_FavoritesByUser,
    DELETE_FavoriteProductByUser,
    DELETE_AllFavoriteByUser
} from "../controllers/favorite.controller";

favoritesRoutes.post("/", POST_Favorite);

favoritesRoutes.get("/:id_user", GET_FavoritesByUser);

favoritesRoutes.delete("/", DELETE_FavoriteProductByUser);

favoritesRoutes.delete("/:id_user", DELETE_AllFavoriteByUser);

export default favoritesRoutes;
