require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

exports.JWTAuthMiddleware = (req, res, next) => {
    const header = req.headers
    const authorization = header['authorization'];

    const token = authorization && authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message:"Invalid token"})
        }
        req.user = decoded;
        next();
    });
}