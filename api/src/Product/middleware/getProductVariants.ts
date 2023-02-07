import db from "../../database";

const getProductVariants = async (id: any) => {
    try {
        return await db.sequelize.query(`
            SELECT *
            FROM "ProductVariant"
            WHERE "ProductVariant"."productId" = ${id};
        `, { type: db.sequelize.QueryTypes.SELECT });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default getProductVariants;
