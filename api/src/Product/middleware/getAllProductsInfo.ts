import db from "../../models";

const getAllProductsInfo = async () => {
    try {
        const allProduct = await db.Product.findAll();
        return allProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener los productos");
    }
}

export default getAllProductsInfo;