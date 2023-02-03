const Sequelize = require('sequelize');
import Product from "../../models/Product"
import db from "../../models";

const getAllProductsInfo = async () => {
    try {
        const getAllInstance = await Product(db.sequelize, Sequelize.DataTypes);
        const allProduct = getAllInstance.findAll();
        return allProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener los productos");
    }
}

export default getAllProductsInfo;