import { Express, Request, Response, response } from "express";
import { Op } from "sequelize";
import db from "../../database";
import { request } from "http";

// LOS PRODUCT EN LA BASE DE DATOS TIENEN ESTA INFO TAMBIEN, Y NO QUEREMOS TOMARLA. ASIQUE USAMOS ...TO_EXCLUDE en la query, para todos
// los endpoint
const TO_EXCLUDE = [
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
];

// Aca se definen funciones que INTERACTUAN con nuestar base de datos


export const GET_FillteredOrderProducts = async (req: Request,res: Response)=> {
  try {
    let filteredProducts;
    const { byColor, byOrder } = req.query;

    // Intentamos quitar las cosas que se repiten nuevamente.
    const COMMON = {
      order: [["price", byOrder || "ASC"]],
      attributes: {
        exclude: TO_EXCLUDE,
      },
    };

    // Seteamos una consulta standar, para no repetir. De todos modos este parseo hay que arreglaro en el componente principal
    const WHERE =
      byColor &&
      byColor !== "null" &&
      byColor !== "all" &&
      byColor !== "undefined"
        ? { where: { color: { [Op.iLike]: byColor } } }
        : {};

    // Como pasamos un objeto, usamos ... para terminar de armar la consulta
    filteredProducts = await db.Product.findAll({
      ...WHERE,
      ...COMMON,
    });

    if (!filteredProducts.length)
      throw new Error(
        "No se encontraron productos en la base de datos cargados"
      );
      
    return res.status(200).json(filteredProducts);
  } catch (error: any) {
    return res.status(400).json({error: error.message});
  }
};

export const POST_NewProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await db.Product.create(req.body);
    return res.status(201).json(newProduct);

    } catch (error: any) {

    return res.status(400).json({ error: error.message });
    }
};

export const GET_ProductById = async (request: Request, response: Response) => {
  const { id } = request.params;
  if (!id) return response.status(400).json("No se ha proporcionado un ID de producto A BUSCAR");
  try {
    const product = await db.Product.findOne({
      where: { id },
      attributes: { exclude: TO_EXCLUDE }
    });
    if (!product) return response.status(204).json("Producto no encontrado");
    return response.status(200).json(product);
  } catch (error:any) {
    return response.status(400).json({ error: error.message});

  }
};

export const GET_AllProducts = async (request: Request, response: Response) => {
  try {
    const total = await db.Product.count();
    const products = await db.Product.findAll({
      include: db.Category,
      attributes: {
        exclude: TO_EXCLUDE,
      },
    });

    response.set("X-Total-Count", total);
    return response.status(200).json(products);
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
};

export const GET_SearchByName = async (
  request: Request,
  response: Response
) => {
  const { name } = request.params;
  if (!name) return response.status(400).json("No se ha proporcionado un NOMBRE de producto");
  try { 
    const products = await db.Product.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: {
        exclude: TO_EXCLUDE,
      },
    });
    return response.status(200).json(products);

  } catch (error: any) {
    return response.status(400).json({error: error.message});

  }
};

export const DELETE_DeleteProduct = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  if (!id) return response.status(400).json("No se ha proporcionado un ID de producto A ELIMINAR");
  try {
    const deletedProduct = await db.Product.destroy({ where: { id } });
    return response.status(200).json(deletedProduct);
  } catch (error: any) {
    return response.status(500).json({error: error.message, }).send("No se elimino");

  }
};


export const UPDATE_UpdateProduct = async (
  request: Request,
  response: Response 
) => {
  try{
  const product = request.body;
  
        // const existingProduct = await db.Product.findByPk(product.id);
        // if (!existingProduct) { 
          
        //     throw new Error(` product found with id ${product.id}`);
        // }
  const [numberOfAffectedRows, affectedRows] = await db.Product.update({
          name: product.name,
          image: product.image,
          description: product.description,
          size: product.size,
          price: product.price,
          show_in_shop: product.show_in_shop,
          color: product.color,
          //"id_category": product.id_category,
      }, {
          where: { id: product.id },
          returning: true
      });
      if (numberOfAffectedRows === 0) {
          throw new Error(`No product updated with id ${product.id}`);
      }
      return response.status(200).json(affectedRows[0]);
      

       //TODO: STATUS => 201: Created, 204: No Content
   } catch (error:any) {
      return response.status(400).json(error.message) //TODO: STATUS => 400: Bad Request
   }
  }


