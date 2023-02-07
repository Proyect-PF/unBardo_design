import sequelize from "sequelize";
import db from "../database";
import Category from "../models/Category";
const instanceOfCategory = Category(db.sequelize, sequelize.DataTypes)

export default instanceOfCategory;