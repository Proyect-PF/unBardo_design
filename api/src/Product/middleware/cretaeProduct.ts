const Sequelize = require('sequelize');
import Product from "../../models/Product"
import db from "../../models";

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
}

const createProduct = async (product: productType): Promise<any> => {
    try {
        const productInstance = await Product(db.sequelize, Sequelize.DataTypes);
        const newProduct = productInstance.create(product);
        return newProduct;
    } catch (error: unknown) {
        throw new Error("No es posible crear el producto");
    }
}

export default createProduct;