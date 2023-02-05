import instanceOfCategory from "..";

const getCategoryInfo = async (id_category: any): Promise<any> => {
    try {
        const infoCategory = instanceOfCategory.findByPk(id_category);
        return infoCategory;
    } catch (error: unknown) {
        throw new Error("No es posible obtener el producto");
    }
}

export default getCategoryInfo;