import db from "../database";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import getErrorMessage from "./handleErrorCatch";

dotenv.config()
export const POST_rolesInitials = async () => {
  try {
    const count = await db.Role.count();
    if (count > 0) return;

    const ROLES = await Promise.all([
      db.Role.create({ name: "user" }),
      db.Role.create({ name: "moderator" }),
      db.Role.create({ name: "admin" }),
    ]);

    console.log(`Roles Created`);
  } catch (error: any) {
    console.error(error.message);
  }
};

// export interface IUserAdmin {
//     fullname: string,
//     email: string,
//     password: string,
//     role: string
//     id:number
// }



//Se le pasa por medio de variables de entorno
export const POST_usersInitials = async (
  fullname: string | undefined,
  email: string | undefined,
  password: string | undefined,
  role: string | undefined
) => {
    try {
        if(!fullname || !email || !password || !role) throw new Error("Datos incompletos")
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
      
          jwt.sign(
          { id: user.id },
          process.env.SECRET || "tokenFake",
          {
            expiresIn: 86400, //24 hs
          }
        );
          console.info("Admin creado con exito")
    } catch (error) {
      console.error(getErrorMessage(error))
    }
};
