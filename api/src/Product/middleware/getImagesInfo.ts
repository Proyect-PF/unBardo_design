import db from "../../database";
const getImageInfo = async (id: any) => {
    try {
        return await db.sequelize.query(`
            SELECT "Image"."imgUrl"
            FROM "Image"
            JOIN "Product" ON "Image"."productId" = "Product".id
            WHERE "Product".id = ${id};
        `, { type: db.sequelize.QueryTypes.SELECT });
    } catch (error: any) {
        throw new Error(error.message);
    }
}




export default getImageInfo;
