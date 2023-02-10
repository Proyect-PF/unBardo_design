//Controlers

import { Request, Response, response } from "express";
import db from "../../database";
import getErrorMessage from "../../helpers/handleErrorCatch";


export const GET_User = async (req: Request, res: Response) => {
  const users = await db.Users.findAll();
  res.send(users);
};

export const POST_User = async (req: Request, res: Response) => {
    try {
        const newUser = await db.Users.create(req.body);
        return res.status(201).json(newUser);
    
        } catch (error) {
    
        return res.status(400).json(getErrorMessage(error));
        }
};

export const UPDATE_User = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { id } = req.params;
    console.log("id:", id);
    console.log("USER:", user);

    const [numberOfAffectedRows, affectedRows] = await db.Users.update(
      {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        
      },
      {
        where: { id: id },
        returning: true,
      }
    );
    console.log("AFECTED ROWS:",affectedRows[0]);
    console.log("AFECTED ROWS:",numberOfAffectedRows);

    // if (numberOfAffectedRows === 0) {
    //   throw new Error(`No user updated with id ${user.id}`);
    // }
    return res.status(200).json(affectedRows[0]);

    //TODO: STATUS => 201: Created, 204: No Content
  } catch (error) {
    return res.status(400).json(getErrorMessage(error)); //TODO: STATUS => 400: Bad Request
  }
};

export const DELETE_User = async (req: Request, res: Response) => {
  res.send("Borra un usuario");
};
