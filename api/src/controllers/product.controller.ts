import {Express, Request, Response, response} from "express";
import {request} from "http";
import {Op} from "sequelize";
import db from "../database/database";
import cloudinary from "../utils/cloudinary";
import getErrorMessage from "../helpers/handleErrorCatch";
import {TypeProduct} from "../types";

// LOS PRODUCT EN LA BASE DE DATOS TIENEN ESTA INFO TAMBIEN, Y NO QUEREMOS TOMARLA. ASIQUE USAMOS ...TO_EXCLUDE en la query, para todos
// los endpoint
const TO_EXCLUDE = [
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

export const GET_ProductById = async (request: Request, response: Response) => {
    const id = request.params.id;
    if (id) {
        const product = await db.Product.findByPk(id, {
            attributes: {
                exclude: TO_EXCLUDE,
            },
            include: db.Category,
        });

        if (!product) {
            return response.status(404).json({error: "Product not found"});
        }

        const images = await db.Image.findAll({
            where: {
                productId: id,
            },
        });

        const imageUrls = images.reduce((obj: any, image: any, i: any) => {
            if (i === 0) {
                obj[`image`] = image.imgUrl;
            } else {
                obj[`image${i + 1}`] = image.imgUrl;
            }
            return obj;
        }, {});

        const productWithImages = {
            ...product.toJSON(),
            ...imageUrls,
        };

        return response.status(200).json(productWithImages);
    }
};

export const POST_NewProduct = async (req: Request, res: Response) => {
    const {promotional_price, promotion, ...images} = req.body;

    try {
        const productData = {
            ...req.body,
        };
        // Si no llega ningún precio promocional, se deja el estado de promoción en false, por defecto el estado es en falso
        if (!productData.promotional_price) {
            productData.promotion = false;
        } else {
            productData.promotion = true;
        }

        const newProduct: TypeProduct = await db.Product.create(productData);

        const {id: productId} = newProduct;

        const createdImages = [];
        for (const key in images) {
            if (key.startsWith("image")) {
                const imgUrl = images[key];
                const uploadRes = await cloudinary.uploader.upload(imgUrl, {
                    upload_preset: 'unbardo'
                });
                const createdImage = await db.Image.create({
                    imgUrl: uploadRes.url,
                    productId,
                });
                createdImages.push(createdImage);
            }
        }


        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(400).json(getErrorMessage(error));
    }
};

export const GET_SearchByName = async (
    request: Request,
    response: Response
) => {
    const {name} = request.params;
    if (!name) return response.status(400).json("No se ha proporcionado un NOMBRE de producto");
    try {
        const products = await db.Product.findAll({
            where: {
                name: {[Op.iLike]: `%${name}%`},
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
    const {id} = request.params;
    if (!id) return response.status(400).json("No se ha proporcionado un ID de producto A ELIMINAR");
    try {
        const deletedProduct = await db.Product.destroy({where: {id}});
        return response.status(200).json(deletedProduct);
    } catch (error: any) {
        return response.status(500).json({error: error.message});

    }
};

export const DELETE_DeleteAllProducts = async (
    request: Request,
    response: Response
) => {
    try {
        const count = await db.Product.count();
        if (count === 0) {
            return response.status(404).json({message: "No se encontraron productos para eliminar"});
        }

        const deletedProducts = await db.Product.destroy({where: {}});
        return response.status(200).json({
            message: `Se han eliminado ${deletedProducts} productos`,
        });
    } catch (error: any) {
        return response.status(500).json({
            error: error.message,
            message: "Ocurrió un error al eliminar todos los productos",
        });
    }
};

export const GET_AllProducts = async (request: Request, response: Response) => {
    try {
        const {id} = request.params;
        const {name, filter, filter2, order, page, perPage, sort} = request.query;

        // Seteamos el optiones BASE de consulta
        let options: any = {
            include: db.Category,
            attributes: {
                exclude: TO_EXCLUDE,
            },
        };

        // Tomamos filters y lo parseamos a string, esto es por si hay un problema al recibir undefined o null o algo
        if (filter || filter2 || name) {
            let where: any = {};
            if (filter === "black" || filter === "white") {
                where.color = filter;
            } else if (filter === 'show' || filter === "hidden") {
                where.show_in_shop = filter === 'show';
            }
            if (filter2 === 'out') {
                where.S = 0;
                where.L = 0;
                where.M = 0;
                where.XL = 0;
            }
            if (filter2 === 'promo') {
                where.promotion = true;
            }
            if (name) {
                where.name = {[Op.iLike]: `%${name}%`};
            }
            options.where = where;
        }
        // Ordenamos por la columna sort y por order, tenemos q convertirlos a string para que se puedan usar en la consulta.
        if (sort) {
            options.order = [[sort as string, order as string]];
        }

        // Tenemos q mandar las page para filtrar, pero la bd solo permite tipo number asique casteamos
        if (perPage && page) {
            options.offset = (Number(page) - 1) * Number(perPage);
            options.limit = perPage;
        }
        // Tomamos la cantidad de la consulta para enviar el paginado al front
        const total = await db.Product.count({where: options.where});
        let products = await db.Product.findAll(options);
        let productsWithImages = [];
        for (const product of products) {
            const images = await db.Image.findAll({
                where: {
                    productId: product.id,
                },
            });
             // Verificar si el objeto images tiene los datos esperados
            const imageUrls = images.reduce((obj: any, image: any, i: any) => {
                if (i === 0) {
                    obj[`image`] = image.imgUrl;
                } else {
                    obj[`image${i + 1}`] = image.imgUrl;
                }
                return obj;
            }, {});

            const productWithImages = {
                ...product.toJSON(),
                ...imageUrls,
            };
            productsWithImages.push(productWithImages);
        }


        // Añadimos la info para el paginado al header del response
        response.set("X-Total-Count", total);
        response.set("Access-Control-Expose-Headers", "X-Total-Count");

        return response.status(200).json(productsWithImages);
    } catch (error: any) {
        return response.status(500).json({error: error.message});
    }
};


export const UPDATE_UpdateProduct = async (req: Request, res: Response) => {
  const { id, promotional_price, promotion, ...images } = req.body;

  try {
    const productData = {
      ...req.body,
    };
    // Si no llega ningún precio promocional, se deja el estado de promoción en false, por defecto el estado es en falso
    if (!productData.promotional_price) {
      productData.promotion = false;
    } else {
      productData.promotion = true;
    }

    const [numberOfAffectedRows, affectedRows] = await db.Product.update(
      productData,
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    const validExtensions = ["jpg", "jpeg", "gif", "bmp", "svg", "webp", "tiff", "png", "gif"];

    const isValidExtension = (fileName: string): boolean => {
      const extension = fileName.split(".").pop()?.toLowerCase();
      if (extension && validExtensions.includes(extension)) {
        return true;
      }
      return false;
    };

    let imagesCount = 0;
    for (const key in images) {
      if (key.startsWith("image")) {
        const imgUrl = images[key];
        if (!isValidExtension(imgUrl)) {
          const uploadRes = await cloudinary.uploader.upload(imgUrl, {
            upload_preset: "unbardo",
          });
          const createdImage = await db.Image.create({
            imgUrl: uploadRes.url,
            productId: id,
          });
          imagesCount++;
        }
      }
    }

    if (imagesCount === 0) {
      throw new Error("You must upload at least one image");
    }

    if (numberOfAffectedRows === 0) {
      throw new Error(`No product updated with id ${id}`);
    }

    const imagesToDelete = await db.Image.findAll({ where: { productId: id }, order: [["createdAt", "ASC"]] });
    for (let i = 0; i < imagesToDelete.length - imagesCount; i++) {
      const image = imagesToDelete[i];
      await image.destroy();
    }

    return res.status(200).json(affectedRows[0]);
  } catch (error) {
    return res.status(400).json(getErrorMessage(error));
  }
};