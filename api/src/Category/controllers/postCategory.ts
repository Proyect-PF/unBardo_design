import { Express, Request, Response } from "express";
import createCategory from '../middlewares/createCategory';

const postCategory = async (request:Request, response:Response) => {
    try {
        const category = request.body;
        const newCategory = await createCategory(category);
        response.status(200).json(newCategory)
    } catch (error) {
        console.log("No funciona el post de categorias")
        response.status(400).json(error)
    }
}

export default postCategory;