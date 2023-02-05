import db from "../../models";

const getAllProductsInfo = async () => {
    try {
        const allProduct = await db.Product.findAll({
            include: 
                db.Category,
                attributes: {
                    exclude: ['promotional_price', 'video', 'stock', , 'height', 'weight', 'width', 'length', 'SKU', 'barcode', 'createdAt', 'updatedAt', 'adminId', 'categoryId'],
                  }
        }
        );
        return allProduct;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default getAllProductsInfo;