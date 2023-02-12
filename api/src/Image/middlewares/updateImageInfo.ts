import db from "../../database";

const updateImageInfo = async (id: any, imgUrl: string) => {
    try {
        const [rowsUpdated] = await db.Image.update({ imgUrl }, { where: { id } });
        if (!rowsUpdated) {
            throw new Error(`No se pudo actualizar la imagen con ID ${id}`);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default updateImageInfo;
