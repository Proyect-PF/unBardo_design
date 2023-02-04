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
      return (searchProd === null)? response.status(204).json('Porducto no creado') : response.status(200).json(searchProd); //TODO: STATUS => 200: Ok, 204: No Content
   } catch (error) {
      return response.status(400).json(error) //TODO: STATUS => 400: Bad Request
   }
}

export default searchProduct;
