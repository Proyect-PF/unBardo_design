import { Op } from 'sequelize';
import db from "../../models";

const getOrderByPrice = async (price: string) => {
  try {
    if (price.toLowerCase() === "asc") {
      const ascPrice = await db.Product.findAll({
        order: [["price", "ASC"]],
        attributes: {
          exclude: [
            "promotional_price",
            "video",
            "stock",
            ,
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
      return ascPrice;
    } else if (price.toLowerCase() === "desc") {
      const descPrice = await db.Product.findAll({
        order: [["price", "DESC"]],
        attributes: {
          exclude: [
            "promotional_price",
            "video",
            "stock",
            ,
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
      return descPrice;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};




export default getOrderByPrice;
//order: [['price', 'ASC'],],
