import express, { Response, Request, Router} from "express"
import getOrders from "../middleware/getOrder";

const getOrder = async (request:Request, response:Response) => {
   
   try {
      const orders = await getOrders()
      response.status(200).json(orders)
      
   } catch (error:any) {
      throw new Error(error.message)
   }
   
}

export default getOrder;