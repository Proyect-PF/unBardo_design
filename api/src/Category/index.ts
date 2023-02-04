import sequelize from "sequelize";
import db from "../models";
import Category from "../models/Category";
const instanceOfCategory = Category(db.sequelize, sequelize.DataTypes)

export default instanceOfCategory;