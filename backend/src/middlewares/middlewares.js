const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        // Handle the error appropriately, e.g. send a response with a 401 status code
        res.status(401).json({ error: 'No authorization header provided' });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token not valid" });
            } else {
                req.userId = decoded.id;
                req.organizationId = decoded.organizationId;
                next();
            }
        });
    }
}

module.exports = {
    verifyToken
}