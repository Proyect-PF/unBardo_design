import { Express, Request, Response } from "express";
import createproduct from '../middleware/cretaeProduct';

const postProduct = async (request:Request, response:Response) => {
   try {
      const prod = request.body;
      const newProd = await createproduct(prod);
      response.status(200).json(newProd)
   } catch (error) {
      console.log("No funca")
      response.status(400).json(error)
   }
}

export default postProduct;