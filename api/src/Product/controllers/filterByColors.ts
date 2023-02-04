import { Express, Request, Response } from "express";
import filterByColor from "../middleware/filterByColors";



interface RequestParams {
  colour: string;
}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {

}

const filterProdByColor = async (request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response:Response) => {
  try {
    const { colour } = request.params;

    let filteredProducts = await filterByColor(colour);
    if (filteredProducts)
    return response.status(200).json(filteredProducts);
  } catch (error:any) {
    return response.status(400).json(error.message);
  }
};

export default filterProdByColor;
