const { response } = require("express")
const jwt = require("jsonwebtoken");

const tokenValidator = (req, res = response, next) => {

    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            message: "No token in request",
            status: "error",
        });
    }
    try {
        
        const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        req.name = name;
        req.token = token;

    } catch (error) {
        console.log("Error validating token:", error);
        return res.status(401).json({
            message: "Invalid token",
            status: "error",
        });
        
    }

    next();

}

module.exports = {
    tokenValidator,
}