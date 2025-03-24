const { VerifyToken, response } = require("../helperfunctions/misc");

exports.ValidateToken = (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(403).json(response("Invalid headers, no token provided"));
    }

    const token = header.split(" ")[1];

    try {
        const user = VerifyToken(token);
        if (user) {
            req.user = user; // Attach user details to request
            return next();
        } else {
            return res.status(401).json(response("Invalid token, authentication failed"));
        }
    } catch (e) {
        return res.status(401).json(response("User session expired, please log in again"));
    }
};
