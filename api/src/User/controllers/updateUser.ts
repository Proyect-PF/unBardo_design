import express, { Response, Request, Router} from "express"

//postUser = Router()

const updateUser = (request:Request, response:Response) => {
   response.send("hola?")
}

//export default postUser
export default updateUser;