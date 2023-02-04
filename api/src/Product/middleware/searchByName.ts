import db from "../../models";
const Sequelize = require("sequelize");
//import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

const searchByName = async (search: string) => {
    try {
        const searchProduct = db.Product.findAll({
            where: {
                name: { [Op.iLike]: `%${search}%`}
            }
        });
        return searchProduct;
    } catch (error: unknown) {
        throw new Error("No es posible buscar el producto");
    }
}

export default searchByName;