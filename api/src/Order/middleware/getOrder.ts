const Sequelize = require('sequelize');
import Orders from "../../models/Orders"
import db from "../../models";


const getOrders = async () => {
    try {
        const orderInstance = await Orders(db.sequelize, Sequelize.DataTypes)
        const allOrders = orderInstance.findAll()
        return allOrders;
    } catch (error: unknown) {
            throw new Error("No es posible obtener ordenes")
    }
}

export default getOrders