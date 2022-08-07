import jwt from "jsonwebtoken";

export default (role) => {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            // Bearer djawjdjawnbdajwbejhehukqjwheuiqwgeyugqwyeqhjabdhajb
            if (!token) {
                return res.status(401).json({ message: "Not auth" })
            }
            const decoded = jwt.verify(token, "randomkey")
            if (decoded.role !== role) {
                console.log(role)
                console.log(decoded.role)
                return res.status(401).json({ message: "Access denied" })
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({ message: "Not auth" })
        }
    }
}