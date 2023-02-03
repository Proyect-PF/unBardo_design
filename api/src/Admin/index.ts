import sequelize from "sequelize";
import db from "../models";
import Admin from "../models/Admin";
const instanceOfAdmin = Admin(db.sequelize, sequelize.DataTypes)

export default instanceOfAdmin