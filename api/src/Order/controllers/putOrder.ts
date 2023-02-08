import express, { Response, Request, Router} from "express"

const putOrder = (request:Request, response:Response) => {
   response.send("put order")
}

export default putOrder;