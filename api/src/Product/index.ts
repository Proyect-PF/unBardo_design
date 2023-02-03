import sequelize from "sequelize";
import db from "../models";
import Product from "../models/Product";
const instanceOfProd = Product(db.sequelize, sequelize.DataTypes)

export default instanceOfProd