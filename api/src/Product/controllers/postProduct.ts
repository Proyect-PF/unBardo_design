


import express, { Response, Request, Router} from "express"

//postUser = Router()

const postProduct = (request:Request, response:Response) => {
   response.send("Post Product")
}

//export default postUser
export default postProduct;