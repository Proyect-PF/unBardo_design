import { Express, Request, Response } from "express";
import getOrderByPrice from "../middleware/getOrderByPrice";

interface RequestParams {
   price: string;
}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {}

const orderByPrice = async (request:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response:Response) => {
   try {
      const {price} = request.params;
      const orderProd = await getOrderByPrice(price);
      return (orderProd === null)? response.status(204).json('Porducto no encontrado') : response.status(200).json(orderProd); //TODO: STATUS => 200: OK, 204: No Content
   } catch (error:any) {
      return response.status(400).json(error.message) //TODO: STATUS => 400: Bad Request
   }
}

export default orderByPrice;
