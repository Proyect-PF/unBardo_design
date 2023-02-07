import express, { Response, Request, Router} from "express"

//postUser = Router()

const deleteUser = (request:Request, response:Response) => {
   response.send("delete product")
}

//export default postUser
export default deleteUser;