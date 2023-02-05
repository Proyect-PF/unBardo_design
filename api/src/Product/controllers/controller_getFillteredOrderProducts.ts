import { Express, Request, Response } from "express";
import db from "../../models";

  const getFillteredOrderProducts = async (req: Request , res:Response): Promise<Object> => {
    try {
      const { byColor , byOrder } = req.query;
      const filteredProducts= await db.Product.findAll({
        where: {
            ['color'] : byColor,
        },
        order: [['price', byOrder? byOrder :"ASC"],],
        attributes: {
          exclude: ['promotional_price', 'video', 'stock', , 'height', 'weight', 'width', 'length', 'SKU', 'barcode', 'createdAt', 'updatedAt', 'adminId', 'id_category']
      }
      });
      return res.status(200).json(filteredProducts);
    } catch (error:any) {
      return res.status(400).json(error.message);
    }
  };
  export default getFillteredOrderProducts;