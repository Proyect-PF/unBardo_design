import instanceOfAdmin from "..";


const getByUsername = async (username:string):Promise<any>=> {
    try {
        const adminByUsername = await instanceOfAdmin.findOne({where: {
            username
        }})
        return adminByUsername
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export default getByUsername