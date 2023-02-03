import { Express, Request, Response } from "express";
import getProductInfo from "../middleware/getProductInfo";
import getAllProductsInfo from "../middleware/getAllProductsInfo";


const getProduct = async (request:Request, response:Response) => {
   try {
      const {id} = request.query;
      if (id?.length) {
         //TODO: Si se envía id por query busca en la base de datos la información del producto relacionada a ese id
         const infoProd = await getProductInfo(id);
         response.status(200).json(infoProd)
      }
      else {
         //TODO: Si no envía id por query busca en la base de datos toda la información de los productos
         const allProd = await getAllProductsInfo();
         response.status(200).json(allProd)
      }
   } catch (error) {
      response.status(400).json(error)
   }
}

export default getProduct;