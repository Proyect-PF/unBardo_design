import {Request, Response} from "express";
import db from "../../database";

const updateImage = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const {imgUrl} = request.body;

        await db.Image.update({
            imgUrl
        }, {
            where: {
                id
            }
        });

        return response.status(200).json({message: `La imagen con ID ${id} ha sido actualizada exitosamente`});
    } catch (error: any) {
        return response.status(400).json({message: error.message});
    }
};

export default updateImage;
