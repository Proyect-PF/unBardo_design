import db from "../../models";

type productType = {
    id: number,
    name: string,
    image: string,
    description: string,
    size: string,
    price: number,
    show_in_shop: string,
    color: string,
    "id_category": number,
}

const updateProductInfo = async (product: productType, id: any): Promise<any> => {
    try {
        console.log("PRODUCT DESDE MIDDLEWARE:", product)
        const existingProduct = await db.Product.findByPk(id);
        console.log("FIND BY PK:", existingProduct)
        if (!existingProduct) {
            
            throw new Error(`No product found with id ${id}`);
        }
        const [numberOfAffectedRows, affectedRows] = await db.Product.update({
            name: product.name,
            image: product.image,
            description: product.description,
            size: product.size,
            price: product.price,
            show_in_shop: product.show_in_shop,
            color: product.color,
            "id_category": product.id_category,
        }, {
            where: { id: id },
            returning: true
        });
        if (numberOfAffectedRows === 0) {
            throw new Error(`No product updated with id ${id}`);
        }
        return affectedRows[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default updateProductInfo;