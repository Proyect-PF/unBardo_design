import express, { Response, Request, Router} from "express"

//postUser = Router()

const getProduct = (request:Request, response:Response) => {
   response.send("get Product")
}

//export default postUser
export default getProduct;