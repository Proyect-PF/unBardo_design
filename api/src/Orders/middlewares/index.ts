import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

const secret = process.env.SECRET || "secret";
const fakeToken = jwt.sign({ fake: "payload" }, secret);
console.log("fakeToken:", fakeToken);





interface RequestWithUser extends Request {
    user: any;
}

export const verifyToken: RequestHandler = (req, res, next) => {
    // const token = req.headers["x-access-token"] || fakeToken;
    const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : fakeToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = (jwt.verify as any)(token, secret);
        (req as RequestWithUser).user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

