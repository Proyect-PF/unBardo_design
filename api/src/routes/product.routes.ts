// IMPORTS
import { Router } from "express";
import {
  DELETE_DeleteAllProducts,
  DELETE_DeleteProduct,
  GET_AllProducts,
  GET_ProductById,
  GET_SearchByName,
  POST_NewProduct,
  UPDATE_UpdateProduct,
} from "../controllers/product.controller";
import { verifyTokenIsAdmin } from "../helpers/verifyTokenIsAdmin";


const productRoutes = Router();

/**
 //TODO: RUTA GET Obtener todos los productos
 */
productRoutes.get("/", GET_AllProducts);

/**
 //TODO: Ruta GET Obtener un producto por id
 */
productRoutes.get("/:id", GET_ProductById);

/**
 //TODO: RUTA UPDATE actualizar productos
 */
productRoutes.put("/", verifyTokenIsAdmin,UPDATE_UpdateProduct);

/**
 //TODO: RUTA DELETE Borrar todos los productos
 */
productRoutes.delete("/deleteAll", verifyTokenIsAdmin,DELETE_DeleteAllProducts);

/**
 //TODO: RUTA GET Buscar productos por nombre
 */
productRoutes.get("/search/:name", GET_SearchByName);

/**
 //TODO: RUTA DELETE Borra un producto por id
 */
productRoutes.delete("/:id", verifyTokenIsAdmin,DELETE_DeleteProduct);

/**
 //TODO: RUTA POST Publica un producto nuevo
 */
productRoutes.post("/", verifyTokenIsAdmin,POST_NewProduct);

export default productRoutes;
