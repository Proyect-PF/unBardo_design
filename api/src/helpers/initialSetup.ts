import db from "../database/database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getErrorMessage from "./handleErrorCatch";
import { State, TypeUser } from "../types";

dotenv.config();

/**
 //TODO: Roles por defecto
 * @returns Si encuentra roles creados, simplemente retorna
 */
export const POST_rolesInitials = async () => {
  try {
    const count = await db.Role.count();
    if (count > 0) return;

    const ROLES = await Promise.all([
      db.Role.create({ name: "user" }),
      db.Role.create({ name: "moderator" }),
      db.Role.create({ name: "admin" }),
    ]);

    console.info(`Roles Created`);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};

/**
 //TODO: Usuario por defecto
 * @param propsUser Propiedades del usuario
 * @returns si encuentra usuarios logueados, no se genera un nuevo usuario admin
 */
export const POST_usersInitials = async (propsUser: TypeUser) => {
  try {
    const { fullname, email, password, role } = propsUser;
    if (!fullname || !email || !password || !role)
      throw new Error("Datos incompletos");
    const count: number = await db.Users.count();
    if (count > 0) return;

    //USER ADMIN
    const foundRole = await db.Role.findOne({
      where: { name: role },
    });
    const user = await db.Users.create({
      email,
      fullname,
      password: await db.Users.encryptPassword(password),
      id_role: foundRole.dataValues.id,
    });

    jwt.sign({ id: user.id }, process.env.SECRET || "tokenFake", {
      expiresIn: 86400, //24 hs
    });
    console.info("Admin creado con exito");
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};

const { USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE } = process.env;
export const USER: TypeUser = {
  fullname: USER_NAME,
  email: USER_EMAIL,
  password: USER_PASSWORD,
  role: USER_ROLE,
};

export const state:State = {} 
if(Boolean(process.env.STATE_DB)){
  state.force = true
}else {
  state.alter = true
}