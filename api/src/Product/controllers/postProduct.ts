import { Express, Request, Response } from "express";
import createproduct from '../middleware/cretaeProduct';

const postProduct = async (request:Request, response:Response) => {
   try {
      const prod = request.body;
      const newProd = await createproduct(prod);
      return response.status(200).json(newProd)
   } catch (error:any) {
      return response.status(400).json(error.message)
   }
}

export default postProduct;