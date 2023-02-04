
import db from "../../models"

//TODO Puede ser que mas adelante presenten cambios las contraseñas etc.

//TODO Tipado de informacion de administrador
type adminType = {
    password: string,
    username: string,
}

/**
 * TODO createAdmin => info
 * Funcion creadora de user administrador a la base de datos
 * @param admin  Usuario Admin a crear
 * @returns Administrador creado.
 */
const createAdmin = async (admin: adminType): Promise<any> => {
    try {
        /**
         * Se llama a la funcion Admin la cual retorna un clase , esta clase da acceso consultas SQL
         * Por parametro recibe la base de datos en si, para sincronizarla y el tipado que van a obtener los datos de este modelo/tabla
         */
        const newAdmin = await db.Admin.create(admin)
        return newAdmin
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default createAdmin
