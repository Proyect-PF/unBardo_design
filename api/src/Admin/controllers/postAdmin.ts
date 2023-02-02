import { Express, Request, Response } from "express"
import createAdmin from "../middlewares/createAdmin"
const postAdmin = async (req: Request, res: Response) => {

    try {
        const adm = req.body
        const adminNew = await createAdmin(adm)
        res.status(200).json(adminNew)
    } catch (error) {
        res.status(401).json(error)
    }
}

export default postAdmin;