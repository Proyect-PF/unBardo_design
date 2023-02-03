
import { Request, Response } from "express"

const getAdmins = async (req:Request, res:Response)=>{ 
    try {
        req.query
    } catch (error) {
        res.status(400).json(error)
    }

}

export default getAdmins
