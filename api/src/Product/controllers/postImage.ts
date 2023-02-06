import { Request, Response } from "express";
import db from "../../database";

const postImage = async (request: Request, response: Response) => {
    try {
        const { productId, imgUrl } = request.body;
        const createdImage = await db.Image.create({
            imgUrl,
            productId,
        });
        return response.status(201).json({ createdImage });
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
};

export default postImage;
