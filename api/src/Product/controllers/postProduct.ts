import { Express, Request, Response } from "express";
import createproduct from '../middleware/cretaeProduct';

const postProduct = async (request:Request, response:Response) => {
   try {
      const prod = request.body;
      const newProd = await createproduct(prod);
      return (newProd === null)? response.status(204).json('Porducto no creado') : response.status(201).json(newProd); //TODO: STATUS => 201: Created, 204: No Content
   } catch (error:any) {
      return response.status(400).json(error.message) //TODO: STATUS => 400: Bad Request
   }
}

export default postProduct;