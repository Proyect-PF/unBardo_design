//Controlers
import { Request, Response } from "express"
import db from "../../database"
export const GET_User = async(req:Request, res:Response) => {
    const users = await db.Users.findAll()
    res.send(users)
}

export const POST_User = async(req:Request, res:Response) => {
    res.send("crea un usuario")
}


export const UPDATE_User = async(req:Request, res:Response)=> {
    res.send("Actualiza un usuario")
}


export const DELETE_User = async(req:Request, res:Response) => {
    res.send("Borra un usuario")
}