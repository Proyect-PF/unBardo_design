import sequelize from "sequelize";
import db from "../models";
import Orders from "../models/Orders";

const instanceOrders = Orders(db.sequelize, sequelize.DataTypes)

export type OrdersType ={
    total_amount: number,
    status: string,
}
 

export default instanceOrders