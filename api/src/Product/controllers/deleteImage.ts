import { Express, Request, Response } from "express";
import db from "../../database";

const deleteImage = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const result = await db.Image.destroy({
            where: {
                id
            }
        });

        if (!result) {
            return response.status(204).json({ message: "No se encontró la imagen con ese ID" });
        }

        return response.status(200).json({ message: "Imagen eliminada exitosamente" });
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
};

export default deleteImage;
