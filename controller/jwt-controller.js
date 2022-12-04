


import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
export const authenticateToken = (request, response, next) => {
    //middle are mai next bhi hota hai'
    const authHeader = request.headers['authorization'];
    // access token bearer ke saath concated hai split
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return response.status(401).json({ msg: "token is missing" });

    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({msg:"invalid token"})

        }
        request.user = user;// data passed
        next();
        // call next to tansfer control to the api call; post controller
    })
    // token and access  secret key
}