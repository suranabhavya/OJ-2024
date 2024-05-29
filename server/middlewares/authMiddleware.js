const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Get token from request header
    console.log(`token: ${token}`)
    if (!token) {
        return res.status(401).json({ message: "Authentication token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (error, decode) => {
        if (error) {
            return res.status(403).json({ message: "Invalid token" });
        }
        const { userId } = decode;
        const user = await User.findById(userId);
        if (!user) return res.status(403).json({ message: "User not found!" });
        req.user = user;
        next();
    });
};