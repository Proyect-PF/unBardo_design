import express, { Response, Request, Router } from "express";

const deleteOrder = (request: Request, response: Response) => {
  response.send("delete order");
};

export default deleteOrder;
