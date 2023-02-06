import db from "../../database";
type productType = {
    name: string,
    description: Text,
    size: string,
    price: number,
    promotional_price: number,
    video: string,
    show_in_shop: string,
    stock: number,
    weight: number,
    width: number,
    height: number,
    length: number,
    SKU: string,
    barcode: string,
    CategoryId:number
}

const createProduct = async (product: productType): Promise<any> => {
    try {
        const newProduct = await db.Product.create(product);
        return newProduct;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default createProduct;