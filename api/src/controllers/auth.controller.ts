import dotenv from "dotenv";
import { Request, Response } from "express"

import jwt from "jsonwebtoken";
import db from "../database/database";
import getErrorMessage from "../helpers/handleErrorCatch";
import { TypeRole, TypeUser } from "../types";
import {sendConfirmationEmailController} from "./email";
import {createUserRegistrationStatistics} from "./statistic/create-user-registration-statistics";
import {loginStatistics} from "./statistic/login-statistics";
dotenv.config();

export const POST_SignUp = async (req: Request, res: Response) => {
  try {


      //TODO: CASO Q SE REGISTRA CON UN ROLE ESPECIFICO
    const { fullname, email, password, role, news_letter, google_id } =
      req.body;
      const emailLower = email.toLowerCase()

      console.log(email)
    //Comprobar si el usuario ya existe
    if (!fullname || !emailLower) throw new Error("Datos incompletos");
    if (role) {
      const foundRole: TypeRole = await db.Role.findOne({
        where: { name: role },
        raw: true,
      });
      const [user, created] = await db.Users.findOrCreate({
        where: { email:emailLower },
        defaults: {
          fullname,
          password: await db.Users.encryptPassword(password),
          id_role: foundRole.id,
          news_letter,
          google_id,
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
      //se crea y devuelve el token - si se loguea con password sin google
      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET || "tokenFake",
        {
          expiresIn: 86400, //24 hs
        }
      );
      // - no se registra con google
      //Si no esta creado, devuelve el token
      return res.status(200).json({ token: token });
    }







  //TODO: CASO Q SE REGISTRA CON GOOGLE
    //->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //Busca el rol user por defecto si no se pasa ningun role
      // -  se registra con google
    if (google_id) {
      const foundRole: TypeRole = await db.Role.findOne({
        where: { name: "user" },
        raw: true,
      });
      const [user, created] = await db.Users.findOrCreate({
        where: { email:emailLower },
        defaults: {
          fullname,
          password: google_id ? null : await db.Users.encryptPassword(password),
          id_role: foundRole.id,
          news_letter,
          google_id,
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
      // si se regitra con google -> le devueve un mensaje
      //crear un token, recibe dos argumentos
      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET || "tokenFake",
        {
          expiresIn: 86400, //24 hs
        }
      );
      await createUserRegistrationStatistics(user.id);

      // Enviar correo electrónico de confirmación
      await sendConfirmationEmailController(emailLower, user.id);
      //Si no esta creado, devuelve el token
      return res.status(200).json({ token: token });
    } 







    //TODO: CASO Q SE REGISTRA CON PASWORD NORMAL    
     //->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    else {
      const foundRole: TypeRole = await db.Role.findOne({
        where: { name: "user" },
        raw: true,
      });
      const [user, created] = await db.Users.findOrCreate({
        where: { email:emailLower },
        defaults: {
          fullname,
          password: await db.Users.encryptPassword(password),
          id_role: foundRole.id,
          news_letter,
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
      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET || "tokenFake",
        {
          expiresIn: 86400, //24 hs
        }
      );
      await createUserRegistrationStatistics(user.id);

      // Enviar correo electrónico de confirmación
      await sendConfirmationEmailController(emailLower, user.id);
      //Si no esta creado, devuelve el token
      return res.status(200).json({ token: token });
    }
  } catch (error) {
    return res.status(400).json(getErrorMessage(error));
  }
};

export const POST_SignIn = async (req: Request, res: Response) => {
  let { email, password, google_id } = req.body;
  const emailLower = email.toLowerCase()
  console.log(emailLower)
  try {
    if (!emailLower) throw new Error("Datos incompletos");
    //Busco el usuario con su nombre de rol
    const userFound = await db.Users.findOne({
      where: { email: emailLower },
      raw: true,
      include: {
        model: db.Role,
        attributes: ["name", "id"],
      },
    });

    if (!userFound) {
      return res
        .status(400)
        .json(getErrorMessage(undefined, "Usuario no encontrado"));
    }
    if (google_id) {
      if (userFound["google_id"] !== google_id) throw new Error("Incorrecta");
    }

    if (password) {
      //Matcheo las passwords
      const matchPassword = await db.Users.comparePassword(
        password,
        userFound.password
      );
      if (!matchPassword) {
        throw new Error("Contraseña Incorrecta");
      }
    }

    //Busco el token del usuario que se registro
    const token = jwt.sign(
      { id: userFound.id },
      process.env.SECRET || "tokenFake",
      {
        expiresIn: 86400,
      }
    );
    const roleA = userFound["Role.name"];
    await loginStatistics(userFound.id);

    return res.json({
      id: userFound["id"],
      token: token,
      role: roleA,
      fullname: userFound["fullname"],
    });
  } catch (error) {
    res.status(400).json(getErrorMessage(error));
  }
};
