import instanceOfCategory from "..";

type CategoryType = {
    id: number;
    name: string;
    description: string;
};

const createCategory = async (category: CategoryType): Promise<any> => {
    try {
        return await instanceOfCategory.create(category);
    } catch (error: unknown) {
        throw new Error("No se pudo crear la categoría");
    }
};

export default createCategory;
