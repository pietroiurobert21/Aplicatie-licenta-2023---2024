const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token not valid" });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

module.exports = {
    verifyToken
}