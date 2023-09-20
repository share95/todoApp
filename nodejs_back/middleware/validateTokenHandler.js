const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let header = req.headers.Authorization || req.headers.authorization;
    if (header && header.startsWith("Bearer")){
        token = header.split(" ")[1];
    }
    else {
        token=header;
    }
    if (token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Token is invalid");
            }

            req.user = decoded.user;
            next();
        });
    } else{
        res.status(401);
        throw new Error("Token is missing");
    }
});



module.exports = validateToken;
