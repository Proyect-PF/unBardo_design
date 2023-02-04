import instanceOfCategory from "..";

const getCategoryInfo = async (id: any): Promise<any> => {
    try {
        const infoCategory = instanceOfCategory.findByPk(id);
        return infoCategory;
    } catch (error: unknown) {
        throw new Error("No es posible obtener el producto");
    }
}

export default getCategoryInfo;