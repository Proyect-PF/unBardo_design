import express, { Response, Request, Router} from "express"

//postUser = Router()

const deleteProduct = (request:Request, response:Response) => {
   response.send("delete product")
}

//export default postUser
export default deleteProduct;