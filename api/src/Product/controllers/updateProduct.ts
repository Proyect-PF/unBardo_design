import { Express, Request, Response } from "express";
import updProduct from "../middleware/updateProductInfo";




const updateProduct = async (request:Request, response:Response) => {
   try {
      const prod = request.body;
      console.log("PRODUCTO DESDE CONTROLLER:", prod, "ID:", prod.id)
      const updatedProd = await updProduct(prod, prod.id);
      return (updatedProd === null)? response.status(204).json('Porducto no modificado') : response.status(201).json(updatedProd); //TODO: STATUS => 201: Created, 204: No Content
   } catch (error:any) {
      return response.status(400).json(error.message) //TODO: STATUS => 400: Bad Request
   }
}

export default updateProduct;