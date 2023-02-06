import db from "../../database";

const getProductInfo = async (id: any): Promise<any> => {
  try {
    const infoProduct = await db.Product.findOne({
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
    return infoProduct;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getProductInfo;
