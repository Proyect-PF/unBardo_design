import { Express, Request, Response } from "express";
import getProductVariants from "../middleware/getProductVariants";

interface RequestParams {
    id: number;
}

interface ResponseBody {
    variants: Array<{
        id: number;
        size: string;
        color: string;
        stock: number;
        price: number;
        quantity: number;
        SKU: string;

    }>
}

const getVariants = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const variants = await getProductVariants(id);

        if (!variants || variants.length === 0) {
            return response.status(204).json({ message: "No se encontraron variantes para ese producto" });
        }

        return response.status(200).json({ variants });
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
};

export default getVariants;
