
import { Request, Response } from "express"
import getByUsername from "../middlewares/getByUsename"
import db from "../../models";


interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  username: string;
}


const getAdmins = async (req:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res:Response)=>{ 
    try {
        const {username} = req.query
        if(username){
            const user = await getByUsername(username)
            return res.status(200).json(user)
        }else{
            const arrusers = await db.Admin.findByNameAll(username)
            return res.status(200).json(arrusers)
        }
    } catch (error:any) {
        res.status(400).json(error.message)
    }

}

export default getAdmins
