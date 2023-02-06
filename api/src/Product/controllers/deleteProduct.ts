import express, { Response, Request, Router} from "express"
import db from "../../models";

//postUser = Router()

interface RequestQuery {
   id: number;
 }

const deleteProduct = async (request:Request, response:Response) => {
   try {
      const {id} = request.query;
      console.log("ID DEL PRODUCTO A BORRAR:",id);

      const result = await db.Product.destroy({
         where:{
            id
         }
      })
      if (!result){
         return response.status(204).json({message: "No se encontró el producto con ese ID"})
      }
      return response.status(200).json({ message: "Producto eliminado correctamente" });
   } catch (error:any) {
      return response.status(400).json({ message: error.message });
   }
   
}

//export default postUser
export default deleteProduct;