import db from "../../models";


const getProductInfo = async (id: any): Promise<any> => {
    try {
        const infoProduct = await db.Product.findByPk(id);
        return infoProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener el producto");
    }
}

export default getProductInfo;