import instanceOfProd from "..";

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
}

const createProduct = async (product: productType): Promise<any> => {
    try {
        const newProduct = instanceOfProd.create(product);
        return newProduct;
    } catch (error: unknown) {
        throw new Error("No es posible crear el producto");
    }
}

export default createProduct;