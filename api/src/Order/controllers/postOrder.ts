import express, { Response, Request, Router} from "express"

const postOrder = (request:Request, response:Response) => {
   response.send("delete order")
}

export default postOrder;