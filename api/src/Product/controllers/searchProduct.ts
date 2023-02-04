import { Express, Request, Response } from "express";
import searchByName from "../middleware/searchByName";

interface RequestParams {
   search: string;
}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {}

const searchProduct = async (request:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response:Response) => {
   try {
      //TODO: Se realiza la busqueda por medio de params
      const {search} = request.params;
      const searchProd = await searchByName(search);
      return response.status(200).json(searchProd)
   } catch (error) {
      return response.status(400).json(error)
   }
}

export default searchProduct;
