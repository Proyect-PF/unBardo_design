import express, { Response, Request, Router} from "express"
import getOrders from "../middleware/getOrder";

const getOrder = async (request:Request, response:Response) => {
   
   try {
      const orders = await getOrders 
      response.status(200).json(orders)
      console.log(response)
      
   } catch (error) {
      console.log(error)
   }
   
}

export default getOrder;