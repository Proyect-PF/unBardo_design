import { Express, Request, Response } from "express";
import getImagesInfo from "../middleware/getImagesInfo";

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
    id?: number;
}

const getImages = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const imageInfo = await getImagesInfo(id);

        if (!imageInfo) {
            return response.status(204).json({ message: "No se encontraron imágenes para ese producto" });
        }

        const imgUrls = imageInfo.map((info:any) => info.imgUrl);

        return response.status(200).json({imgUrls});
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
};




export default getImages;
