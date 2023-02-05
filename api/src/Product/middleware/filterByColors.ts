import db from "../../models";

const filterByColors = async (color: string): Promise<any> => {
    try {
        const filteredProduct = await db.Product.findAll({ 
            where: {
                color : `${color}`
            },
            attributes: {
                exclude: [
                  "video",
                  "stock",
                  "height",
                  "weight",
                  "width",
                  "length",
                  "SKU",
                  "barcode",
                  "createdAt",
                  "updatedAt",
                  "adminId",
                  "id_category",
                ],
              },
        });
        return filteredProduct;

    } catch (error: unknown) {
        throw new Error(`No es posible obtener el producto. Ser recibio: ${color}`);
    }
}

export default filterByColors;