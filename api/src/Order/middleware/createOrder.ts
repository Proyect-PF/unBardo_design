import { OrdersType } from "..";
import db from "../../models";
const createOrder = async (order:OrdersType) => {
    try {
        console.log(order)
        const newOrder = await db.Orders.create(order)
        return newOrder
    } catch (error:any){
        throw new Error(error.message)
    }
}

export default createOrder