import { Express, Request, Response } from "express";
import db from "../../models";
import Op from "../../models/index";

//import Product from "../../models/Product";

  interface Product {
    id: number,
    color: string,
    name: string,
    description: string,
    size: string,
    show_in_shop: string,
    price: number,
    promotional_price?: null,
    video?: null,
    stock?: null,
    weight?: null,
    width?: null,
    height?: null,
    length?: null,
    SKU?: null,
    barcode?: null,
    createdAt?: string,
    updatedAt?: string,
    id_category?: null
  }
  const getFillteredOrderProducts = async (req: Request , res:Response): Promise<any> => {
    try {
      console.log("VAMOS A PROCEDER A TOMAR LA QUERY")
      const { byColor , byOrder } = req.query;
      console.log("VAÑOR DE byColor:",byColor)
      console.log("VAÑOR DE byColor:",byOrder)

      const filteredProducts= await db.Product.findAll({
        where: {
            ['color'] : byColor,
        },
        order: [['price', byOrder? byOrder :"ASC"],]
      });

      console.log("DATOS TRAIDOS >>>>>>>>>>")
      console.log(filteredProducts)
      return res.status(200).json(filteredProducts);
    } catch (error:any) {
      return res.status(400).json(error.message);
    }
  };
  export default getFillteredOrderProducts;