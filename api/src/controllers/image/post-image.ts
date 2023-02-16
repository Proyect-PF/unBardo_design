import { Request, Response } from "express";
import db from "../../database/database";

const postImages = async (request: Request, response: Response) => {
    try {
        const { productId, ...images } = request.body;
        const createdImages = [];
        for (const key in images) {
            if (images.hasOwnProperty(key)) {
                const createdImage = await db.Image.create({
                    imgUrl: images[key],
                    productId,
                });
                createdImages.push(createdImage);
            }
        }
        return response.status(201).json({ createdImages });
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
};

export default postImages;
