import express, { Response, Request, Router} from "express"
import getOrders from "../middleware/getOrder";

const getOrder = async (request:Request, response:Response) => {
   
   try {
      const orders = await getOrders()
      return response.status(200).json(orders)
      
   } catch (error:any) {
      return response.status(400).json(error.message)
   }
   
}

export default getOrder;