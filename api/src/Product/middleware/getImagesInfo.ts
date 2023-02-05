import db from "../../models";
const getImageInfo = async (id: any) => {
    try {
        return await db.sequelize.query(`
            SELECT "Images"."imgUrl"
            FROM "Images"
            JOIN "Products" ON "Images"."productId" = "Products".id
            WHERE "Products".id = ${id};
        `, { type: db.sequelize.QueryTypes.SELECT });
    } catch (error: any) {
        throw new Error(error.message);
    }
}




export default getImageInfo;
