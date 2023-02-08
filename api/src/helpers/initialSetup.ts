import db from "../database"

export const POST_rolesInitials = async () => {
    try {
        const count = await db.Role.count()
        if(count > 0) return;
    
        const values = await Promise.all([
             db.Role.create({name: "user"}),
             db.Role.create({name: "moderator"}),
             db.Role.create({name: "admin"}),
        ])
    
        console.log(values)
    } catch (error:any) {
        console.error(error.message)
    }
}