import { NextFunction, Request, Response } from "express";
import db from "../../database";

const validateImageId = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;

    if (!id) {
        return response.status(400).json({ message: "El ID de la imagen es requerido" });
    }

    const image = await db.Image.findByPk(id);

    if (!image) {
        return response.status(400).json({ message: "No se encontró una imagen con ese ID" });
    }

    next();
};


export default validateImageId;
