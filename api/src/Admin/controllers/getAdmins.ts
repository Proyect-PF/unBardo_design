
import { Request, Response } from "express"
import getByUsername from "../middlewares/getByUsename"
import instanceOfAdmin from "..";

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
            const arrusers = await instanceOfAdmin.findByNameAll(username)
            return res.status(200).json(arrusers)

        }

    } catch (error) {
        res.status(400).json(error)
    }

}

export default getAdmins
