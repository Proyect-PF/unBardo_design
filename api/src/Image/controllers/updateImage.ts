import { Request, Response } from "express";
import updateImageInfo from "../middlewares/updateImageInfo";

const updateImage = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const { images } = request.body;

        const updatedImage = await updateImageInfo(id, images);

        return response.status(200).json({ message: `La imagen con ID ${id} ha sido actualizada exitosamente` });
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
};

export default updateImage;
