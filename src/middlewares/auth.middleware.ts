import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../utils/express";

// export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {

// const token = req.header("Authorization")
// console.log("token in auth middleware: " + token)
// if (!token) {
//     res.send("token is invalid")
//     return
// }

// const splittedToken=token.split(" ")[1];
// const data= jwt.verify(splittedToken, process.env.SECRET_KEY!);
// console.log("decoded data: "+data)
// next()
// }


//////////////////////////////main/////////////////////////////
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];  //splitting "Bearer" from token
    console.log("token in auth mid:" + token)
    if (!token) {
        // res.status(403).json({ message: "Access denied" });
        res.json({ message: "Access denied", data: [] });
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        console.log("decoded" + JSON.stringify(decoded))
        req.userData = decoded;  //put the id in req.userDate to be able to reach this id in controller 
        next();
    } catch (error) {
        req.userData = '';
        // res.status(401).json({ message: "Invalid token" });
        res.json({ message: "Invalid token" });
    }
};