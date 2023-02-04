import { Request, Response } from "express"
import createAdmin from "../middlewares/createAdmin"
const postAdmin = async (req: Request, res: Response) => {

    try {
        const adm = req.body
        const newAdmin = await createAdmin(adm)
        return res.status(200).json(newAdmin)
    } catch (error:any) {
        res.status(401).json(error.message)
    }
}

export default postAdmin;