const Sequelize = require("sequelize");
import instanceOfProd from "..";
import db from "../../models";
import Colour from "../../models/Colour";

type productType = {
  name: string,
  description: string,
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
  color: string,
};

const createProduct = async (product: productType): Promise<any> => {
  try {
    console.log("CREATE PRODUCT", product);
    const newProduct = await db.Product.create(product);
    const color = await db.Colour.findOrCreate({
      where: { name: product.color },
    });
    await newProduct.addColour(color[0]);
    return newProduct;
  } catch (error) {
    throw new Error("Could not create product");
  }
};

export default createProduct;