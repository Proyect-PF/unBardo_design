import db from "../../models"



const getByUsername = async (username:string):Promise<any>=> {
    try {
        return await db.Admin.findOne({where: {
            username
        }})
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export default getByUsername