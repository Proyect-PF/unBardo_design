import { Express, Request, Response } from "express";
import db from "../../models";
import { Op } from "sequelize";

const getFillteredOrderProducts = async (
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
         order: [['price', byOrder ? byOrder : "ASC"],],
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
export default getFillteredOrderProducts;
