import { Express, Request, Response } from "express";
import getCategoryInfo from "../middlewares/getCategoryInfo";
import getAllProductsInfo from "../middlewares/getAllCategoryInfo";

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
    id_category: number;
}

const getCategory = async (request:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response:Response) => {
    try {
        const {id_category} = request.query;
        if (id_category) {
            //TODO: Si se envía id por query busca en la base de datos la información del producto relacionada a ese id
            const infoCategory = await getCategoryInfo(id_category);
            return response.status(200).json(infoCategory)
        }
        else {
            //TODO: Si no envía id por query busca en la base de datos toda la información de los productos
            const allCategory = await getAllProductsInfo();
            return response.status(200).json(allCategory)
        }
    } catch (error) {
        return response.status(400).json(error)
    }
}

export default getCategory;
