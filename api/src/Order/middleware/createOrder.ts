import instanceOrders, { OrdersType } from "..";

const createOrder = async (order:OrdersType) => {
    try {
        console.log(order)
        const newOrder = await instanceOrders.create(order)

        return newOrder
    } catch (error:any){
        throw new Error(error.message)
    }
}

export default createOrder