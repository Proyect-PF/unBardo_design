import express, { Response, Request, Router} from "express"

//postUser = Router()

const putProduct = (request:Request, response:Response) => {
   response.send("Put Product")
}

//export default postUser
export default putProduct;