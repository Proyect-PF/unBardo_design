import { Request, Response, NextFunction } from "express"
import jwt, { Jwt } from "jsonwebtoken"
import db from "../database/database"
import dotenv from "dotenv"
import { IDecoded } from "../types"
dotenv.config()

/**
 * 
 * @param req Token de verificacion
 * @param res Respoonde dependiendo si encuentra un token, si coincide el token o si el usuario es admin o no
 * @param next si el usuario es adin da acceso a las demas rutas
 * @returns 
 */
export const verifyTokenIsAdmin = async (req: Request, res: Response, next: NextFunction):Promise<object | undefined>=> {
    try {
        const token = req.header("x-access-token")
        //Comprobamos si existe el token
        if(!token) return res.status(401).json({message: "no token provide"})
    
        //buscamos el token
        const decoded = jwt.verify(token, process.env.SECRET || "tokenFake") as IDecoded
        
        //Usuraio que se encuentra por medio del token que se pasa por mdio del acces token
        const userFound = await db.Users.findByPk(decoded.id, {
            exclude: ["password"],
            raw: true,
            include: {
              model: db.Role,
              attributes: ["name"],
            },
        })
        if(!userFound) return res.status(404).json({message: "user not found"})
        if(userFound["Role.name"] === "admin") next()
        else return res.status(400).json({message: `not permissions for role ${userFound["Role.name"]}`})
    } catch (error) {
        return res.status(500).json({message: "unauthorized"})
    }
}
