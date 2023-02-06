import { Op } from 'sequelize';
import db from "../../models";
// import { Product } from './../../../../client/src/state/types/index';



const getFillteredOrderProducts = async (byColor: string, byOrder: string) => {

    try {
        let Products = await db.Country.findAll({
            where:{
                color: {
                    [db.Op.iLike] : `${byColor}`
                },
            },
            order:[
                ['price', `${byOrder.toUpperCase}`],
            ],
            exclude: ['promotional_price', 'video', 'stock', , 'height', 'weight', 'width', 'length', 'SKU', 'barcode', 'createdAt', 'updatedAt', 'adminId', 'categoryId']
        });
        return Products;
    } catch (error: any){
        throw new Error(error.message);
    }

}
export default getFillteredOrderProducts;