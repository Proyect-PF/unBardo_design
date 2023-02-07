import instanceOfCategory from "..";


const getAllProductsInfo = async () => {
    try {
        const allCategory = instanceOfCategory.findAll();
        return allCategory;
    } catch (error: unknown) {
        throw new Error("No es posible obtener los productos");
    }
}

export default getAllProductsInfo;