import db from "../../database";

type Products = {
  id: number;
  colour: string;
  image_url: null;
  name: string;
  description: string;
  size: string;
  show_in_shop: string;
  price: number;
  CategoryId: number;
};

const productsByCategories = async (id_category: number): Promise<Products> => {
  try {
    const arrProducts = await db.Product.findAll({
      where: {
        id_category,
      },
      //Se excluyen las siguientes propiedades para refacting en el front
      attributes: {
        exclude: [
          
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
    if (!arrProducts.length)
      throw new Error("No hay productos con esta categoria");
    return arrProducts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default productsByCategories;
