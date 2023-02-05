import { Express, Request, Response } from "express";
import getAllProductsInfo from "../middleware/getAllProductsInfo";
import getProductInfo from "../middleware/getProductInfo";

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  id: number;
}

const getProduct = async (request:Request, response:Response) => {
   try {
      const {id} = request.query;
      if (id) {
         //TODO: Si se envía id por query busca en la base de datos la información del producto relacionada a ese id
         const infoProd = await getProductInfo(id);
         return (infoProd === null)? response.status(204).json('Porducto no encontrado') : response.status(200).json(infoProd); //TODO: STATUS => 200: OK, 204: No Content
      }
      else {
         //TODO: Si no envía id por query busca en la base de datos toda la información de los productos
         const allProd = await getAllProductsInfo();
         return (allProd === null)? response.status(204).json('Porducto no encontrado') : response.status(200).json(allProd); //TODO: STATUS => 200: OK, 204: No Content
      }
   } catch (error:any) {
      return response.status(400).json(error.message) //TODO: STATUS => 400: Bad Request
   }
}

export default getProduct;
