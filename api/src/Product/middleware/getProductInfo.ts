import instanceOfProd from "..";

const getProductInfo = async (id: any): Promise<any> => {
    try {
        const infoProduct = instanceOfProd.findByPk(id);
        return infoProduct;
    } catch (error: unknown) {
        throw new Error("No es posible obtener el producto");
    }
}

export default getProductInfo;