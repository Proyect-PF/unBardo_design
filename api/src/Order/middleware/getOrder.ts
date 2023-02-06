import db from "../../database";

const getOrders = async () => {
    try {
        const allOrders = await db.Orders.findAll()
        if (!allOrders.length) throw new Error("No se encontraron ordenes en la base de datos")
        return allOrders;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default getOrders