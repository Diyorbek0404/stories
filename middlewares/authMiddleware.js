import jwt from "jsonwebtoken";

export default (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "Ro'yxatdan o'tmagan" })
        }
        const decode = jwt.verify(token, "randomkey")
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({ message: "Ro'yxatdan o'tmagan" })
    }
}