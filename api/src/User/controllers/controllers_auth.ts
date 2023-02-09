import db from "../../database";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export const POST_SignUp = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, role } = req.body;
    //Comprobar si el usuario ya existe

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
        const tokenFound = jwt.sign({ id: user.id }, process.env.SECRET || "tokenFake", {
          expiresIn: 86400,
        });
        return res.header("auth-token", tokenFound).json({message: "usuario ya creado"});
      }
      
      const token = jwt.sign({ id: user.id }, process.env.SECRET|| "tokenFake", {
        expiresIn: 86400, //24 hs
      });
      //Si no esta creado, devuelve el token
      return res.status(200).json({token: token});
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
      const tokenFound = jwt.sign({ id: user.id }, process.env.SECRET || "tokenFake", {
        expiresIn: 86400,
      });
      return res.header("auth-token", tokenFound).json({message: "usuario ya creado"});
    }

    //crear un token, recibe dos argumentos
    const token = jwt.sign({ id: user.id }, process.env.SECRET|| "tokenFake", {
      expiresIn: 86400, //24 hs
    });
      //Si no esta creado, devuelve el token
    return res.status(200).json({token: token});
  } catch (error) {
    return res.status(400).json({ error });
  }
};




export const POST_SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    
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
    return res.status(401).json({ token: null, messaage: "Invalid Password" });

  //Busco el token del usuario que se registro
  const token = jwt.sign({ id: userFound.id }, process.env.SECRET|| "tokenFake", {
    expiresIn: 86400,
  });

  res.json({ token: token });
  } catch (error) {
    res.status(400).json({error})
  }
};
