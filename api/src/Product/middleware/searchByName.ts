import instanceOfProd from "..";
const Sequelize = require("sequelize");
//import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

const searchByName = async (search: string) => {
    try {
        const searchProduct = instanceOfProd.findAll({
            where: {
                name: { [Op.like]: `%${search}%`}
            }
        });
        return searchProduct;
    } catch (error: unknown) {
        throw new Error("No es posible buscar el producto");
    }
}

export default searchByName;