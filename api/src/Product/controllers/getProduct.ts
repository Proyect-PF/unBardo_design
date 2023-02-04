import { Express, Request, Response } from "express";
import getProductInfo from "../middleware/getProductInfo";
import getAllProductsInfo from "../middleware/getAllProductsInfo";

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  id: number;
}

const getProduct = async (request:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response:Response) => {
   try {
      const {id} = request.query;
      if (id) {
         //TODO: Si se envía id por query busca en la base de datos la información del producto relacionada a ese id
         const infoProd = await getProductInfo(id);
         return response.status(200).json(infoProd)
      }
      else {
         //TODO: Si no envía id por query busca en la base de datos toda la información de los productos
         const allProd = await getAllProductsInfo();
         return response.status(200).json(allProd)
      }
   } catch (error:any) {
      return response.status(400).json(error.message)
   }
}

export default getProduct;
