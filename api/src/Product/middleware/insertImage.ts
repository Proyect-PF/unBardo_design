import db from "../../database";
const insertImage = async (data: any) => {
    try {
        const { productId, imgUrl } = data;
        return await db.Image.create({
            imgUrl,
            productId,
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default insertImage;
