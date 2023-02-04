import db from "../../models";

const filterByColors = async (colour: string): Promise<any> => {
    try {
        const filteredProduct = await db.Product.findAll({ where: { colour } });
        return filteredProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener el producto");
    }
}

export default filterByColors;