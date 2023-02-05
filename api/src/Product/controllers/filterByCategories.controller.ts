import express, { Response, Request, Router } from "express"
import productsByCategories from "../middleware/filterByCategory"


interface RequestParams {
    id_category: number;
}

interface ResponseBody { }

interface RequestBody { }

interface RequestQuery {
}

/**
 * 
 * @param request requiere el id de la categoria para hacer la consulta al db
 * @param response Envia el array de productos si hay esos productos
 */
const filterByCategories = async (request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response: Response) => {
    try {

        const { id_category } = request.params
        console.log(id_category)
        const arrProducts = await productsByCategories(id_category)
        response.status(200).send(arrProducts)
    } catch ({ message }: any) {
        response.status(400).json(message)
    }

}

//export default postUser
export default filterByCategories;