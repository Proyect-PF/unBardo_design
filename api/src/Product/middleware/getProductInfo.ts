const Sequelize = require('sequelize');
import Product from "../../models/Product"
import db from "../../models";

const getProductInfo = async (id: any): Promise<any> => {
    try {
        const getInstance = await Product(db.sequelize, Sequelize.DataTypes);
        const infoProduct = getInstance.findByPk(id);
        return infoProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener el producto");
    }
}

export default getProductInfo;