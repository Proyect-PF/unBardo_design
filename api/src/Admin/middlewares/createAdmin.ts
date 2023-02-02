
const Sequelize = require('sequelize');
import Admin from "../../models/Admin"
import db from "../../models";
import { HttpError } from "http-errors";

type adminType = {
    password: string,
    username: string,
}

const createAdmin = async (admin: adminType): Promise<any> => {
    try {
        const InstanciaDeAdmin = await Admin(db.sequelize, Sequelize.DataTypes)
        const newAdmin = InstanciaDeAdmin.create(admin)
        return newAdmin
    } catch (error: unknown) {
        throw new Error("No se puede crear el usuario xd")
    }
}

export default createAdmin