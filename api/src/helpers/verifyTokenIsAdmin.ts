import { Request, Response, NextFunction } from "express"
import jwt, { Jwt } from "jsonwebtoken"
import { JwtHeader } from "jsonwebtoken"
import db from "../database/database"
import dotenv from "dotenv"
dotenv.config()

interface IDecoded {
    id:string;
    iat:number;
    exp:number;
}


export const verifyTokenIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-access-token")
        console.log(token)
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
