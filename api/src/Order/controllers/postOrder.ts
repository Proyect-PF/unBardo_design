import express, { Response, Request, Router} from "express"
import createOrder from "../middleware/createOrder";

const postOrder = async (request:Request, response:Response) => {
   try {
      const order = request.body;
      const newOrder = await createOrder(order)
      return response.status(201).json(newOrder)
   } catch (error:any) {
      return response.status(400).json(error.message) 
   }
}

export default postOrder;