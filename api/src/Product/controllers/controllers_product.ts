import { Express, Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../database";

type productType = {
  name: string,
  description: Text,
  size: string,
  price: number,
  promotional_price: number,
  video: string,
  show_in_shop: string,
  stock: number,
  weight: number,
  width: number,
  height: number,
  length: number,
  SKU: string,
  barcode: string,
  CategoryId:number
}



// Aca se definen funciones que INTERACTUAN con nuestar base de datos
export const GET_FillteredOrderProducts = async (
  req: Request,
  res: Response
): Promise<Object> => {
  try {
    let filteredProducts;
    const { byColor, byOrder } = req.query;
    if (
      byColor === "undefined" ||
      !byColor ||
      byOrder === "undefined" ||
      byColor === "null" ||
      byOrder === "null" ||
      byColor === "all"
    ) {
      filteredProducts = await db.Product.findAll({
         order: [['price', byOrder ? byOrder :"ASC"],],
        attributes: {
          exclude: [
            "promotional_price",
            "video",
            "stock",
            "height",
            "weight",
            "width",
            "length",
            "SKU",
            "barcode",
            "createdAt",
            "updatedAt",
            "adminId",
            "id_category",
          ],
        },
      });
    } else {
      filteredProducts = await db.Product.findAll({
        where: {
          color: { [Op.iLike]: byColor },
        },
        order: [["price", byOrder ? byOrder : "ASC"]],
        attributes: {
          exclude: [
            "promotional_price",
            "video",
            "stock",
            "height",
            "weight",
            "width",
            "length",
            "SKU",
            "barcode",
            "createdAt",
            "updatedAt",
            "adminId",
            "id_category",
          ],
        },
      });
    }

    if (!filteredProducts.length)
      throw new Error(
        "No se encontraron productos en la base de datos cargados"
      );
    return res.status(200).json(filteredProducts);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

export const POST_NewProduct = async (request: Request, response: Response) =>{
    const producto = request.body;
    try {
        const CARGAR = await db.Product.create(producto)
        return response.status(201).json(CARGAR)
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
}

export const GET_ProductById = async (request:Request, response:Response) => {
  try {
     const {id} = request.params;
     if (id) {
        const PRODUCT_INFO = await db.Product.findOne({
          where: {
            id,
          },
        attributes: {
          exclude: [
            "promotional_price",
            "video",
            "stock",
            "height",
            "weight",
            "width",
            "length",
            "SKU",
            "barcode",
            "createdAt",
            "updatedAt",
            "adminId",
            "id_category",
          ],
        },
      });
        return (PRODUCT_INFO === null)? response.status(204).json('Porducto no encontrado') : response.status(200).json(PRODUCT_INFO); //TODO: STATUS => 200: OK, 204: No Content
     }
  } catch (error:any) {
     return response.status(400).json(error.message) //TODO: STATUS => 400: Bad Request
  }
};

export const GET_AllProducts = async (request:Request, response:Response) => {
  try {
    const ALL_PRODUCTS = await db.Product.findAll({
      include: db.Category,
      attributes: {
        exclude: [
          "promotional_price",
          "video",
          "stock",
          "height",
          "weight",
          "width",
          "length",
          "SKU",
          "barcode",
          "createdAt",
          "updatedAt",
          "adminId",
          "id_category",
        ],
      },
    });
    return response.status(200).json(ALL_PRODUCTS);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GET_SearchByName = async (request:Request, response:Response) => {
  const { name }  = request.params;
  try {
    const searchProduct = await db.Product.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: {
        exclude: [
          "promotional_price",
          "video",
          "stock",
          "height",
          "weight",
          "width",
          "length",
          "SKU",
          "barcode",
          "createdAt",
          "updatedAt",
          "adminId",
          "id_category",
        ],
      },
    });
    return response.status(200).json(searchProduct);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

