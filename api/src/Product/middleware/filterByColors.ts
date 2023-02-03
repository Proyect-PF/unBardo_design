const Sequelize = require('sequelize');
import ProductColor from "../../models/Colour"
import db from "../../models";

const filterByColors = async (color: string): Promise<any> => {
    try {
        const getInstance = await ProductColor(db.sequelize, Sequelize.DataTypes);
        const filteredProduct = getInstance.findAll({ where: { name: color } });
        return filteredProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener el producto");
    }
}

export default filterByColors;