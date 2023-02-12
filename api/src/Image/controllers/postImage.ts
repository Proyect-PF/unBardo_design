import { Request, Response } from "express";
import db from "../../database";

const postImages = async (request: Request, response: Response) => {
    try {
        const { productId, images } = request.body;
        const createdImages = [];
        for (const image of images) {
            const createdImage = await db.Image.create({
                imgUrl: image,
                productId,
            });
            createdImages.push(createdImage);
        }
        return response.status(201).json({ createdImages });
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
};

export default postImages;
