import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../../database";
import { POST_AddToCart } from "./../../Cart/controllers/controllers_cart";
import getErrorMessage from "../../helpers/handleErrorCatch";
dotenv.config();





{/** Refactorizacion */}
// El proceso de creacion en la BD lo verificamos en una funcion a parte
{/** 
const createUserAndToken = async (fullname: string, email: string, password: number, role: string) => {
  const foundRole = await db.Role.findOne({
    where: { name: role || "user" },
  });

  const [user, created] = await db.Users.findOrCreate({
    where: { email },
    defaults: {
      fullname,
      password: await db.Users.encryptPassword(password),
      id_role: foundRole.dataValues.id,
    },
  });
  if (!created) {
    return {
      message: "usuario ya creado",
      token: jwt.sign({ id: user.id }, process.env.SECRET || "tokenFake", {
        expiresIn: 86400,
      }),
    };
  }
  return {
    token: jwt.sign({ id: user.id }, process.env.SECRET || "tokenFake", {
      expiresIn: 86400,
    }),
  };
};
export const POST_SignUp = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, role } = req.body;
    const result = await createUserAndToken(fullname, email, password, role);
    if(result.message){
      return res.header("auth-token").json(result)
    }
  }
};
*/}


// Sacamos un poco las variables intermedias y comparamos las contraseñas con el compare para los tipo password
{/**
export const POST_SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.Users.findOne({
      where: { email },
      include: [{
        model: db.Role,
        attributes: ["name", "id"]
      }]
    });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET || "tokenFake", {
      expiresIn: 86400
    });

    return res.json({ token });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
*/}


export const POST_SignUp = async (req: Request, res: Response) => {

  try {
    const { fullname, email, password, role } = req.body;
    //Comprobar si el usuario ya existe
    if(!fullname || !email || !password) throw new Error("Datos incompletos")
    if (role) {
      const foundRole = await db.Role.findOne({
        where: { name: role },
      });
      const [user, created] = await db.Users.findOrCreate({
        where: { email },
        defaults: {
          fullname,
          password: await db.Users.encryptPassword(password),
          id_role: foundRole.dataValues.id,
        },
      });

      //Si ya esta creado devuelve un {message} y su token
      if (!created) {
        const tokenFound = jwt.sign(
          { id: user.id },
          process.env.SECRET || "tokenFake",
          {
            expiresIn: 86400,
          }
        );
        return res
          .header("auth-token", tokenFound)
          .status(400)
          .json({ message: "usuario ya creado" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET || "tokenFake",
        {
          expiresIn: 86400, //24 hs
        }
      );
      //Si no esta creado, devuelve el token
      return res.status(200).json({ token: token });
    }

    //->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //Busca el rol user por defecto si no se pasa ningun role
    const foundRole = await db.Role.findOne({
      where: { name: "user" },
    });
    const [user, created] = await db.Users.findOrCreate({
      where: { email },
      defaults: {
        fullname,
        password: await db.Users.encryptPassword(password),
        id_role: foundRole.dataValues.id,
      },
    });
    //Si ya esta creado devuelve un {message} y su token
    if (!created) {
      const tokenFound = jwt.sign(
        { id: user.id },
        process.env.SECRET || "tokenFake",
        {
          expiresIn: 86400,
        }
      );
      return res
        .header("auth-token", tokenFound)
        .status(400)
        .json({ message: "usuario ya creado" });
    }

    //crear un token, recibe dos argumentos
    const token = jwt.sign({ id: user.id }, process.env.SECRET || "tokenFake", {
      expiresIn: 86400, //24 hs
    });
    //Si no esta creado, devuelve el token
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(400).json(getErrorMessage(error));
  }
};



export const POST_SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if(!email || !password) throw new Error("Datos incompletos")

    //Busco el usuario con su nombre de rol
    const userFound = await db.Users.findOne({
      where: { email },
      raw: true,
      include: {
        model: db.Role,
        attributes: ["name", "id"],
      },
    });

    if (!userFound) return res.status(400).json({ message: "user not found" });

    //Matcheo la password
    const matchPassword = await db.Users.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword)
    throw res
        .status(401)
        .json({ token: null, messaage: "Invalid Password" });

    //Busco el token del usuario que se registro
    const token = jwt.sign(
      { id: userFound.id },
      process.env.SECRET || "tokenFake",
      {
        expiresIn: 86400,
      }
    );
      const roleA = userFound["Role.name"]
  return res.json({ token: token , roleA});
  } catch (error) {
    res.status(400).json(getErrorMessage(error));
  }
};
