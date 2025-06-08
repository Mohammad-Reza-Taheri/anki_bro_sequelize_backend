import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY!, { expiresIn: "7d" });
};


// export const decodeToken = (token: string) => {
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY!)
//     return decodeToken;
// }