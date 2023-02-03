import instanceOfProd from "..";

const getAllProductsInfo = async () => {
    try {
        const allProduct = instanceOfProd.findAll();
        return allProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener los productos");
    }
}

export default getAllProductsInfo;