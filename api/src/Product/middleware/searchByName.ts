import db from "../../models";
import { Op } from "sequelize";

const searchByName = async (search: string) => {
  try {
    const searchProduct = await db.Product.findAll({
      where: {
        name: { [Op.iLike]: `%${search}%` },
      },
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
    return searchProduct;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default searchByName;
