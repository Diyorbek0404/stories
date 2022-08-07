import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

const generateJwt = (username, _id, role) => {
    return jwt.sign(
        { username, _id, role }, 'randomkey'
    )
}
class UserController {
    async registration(req, res, next) {
        const { password, username } = req.body
        if (!password || !username) {
            return next(ApiError.badRequest("parol yoki foydalanuvchi nomi kiritilmagan"))
        }
        const userFind = await User.findOne({ username: username })
        if (userFind) {
            return next(ApiError.badRequest("Bu foydalanuvchi avval ro'yxatdan o'tgan"))
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({ username, password: hashPassword })
        const token = generateJwt(user.username, user._id, user.role)
        return res.send({ user, token })
    }

    async login(req, res, next) {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(ApiError.internal("bunday foydalanuvchi topilmadi"))
        }
        let comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest("Parol xato"))
        }
        const token = generateJwt(user.username, user._id, user.role)
        return res.send({ user, token })
    }

    async check(req, res, next) {
        const token = generateJwt(_id, username, role)
        return res.json({ token })
    }
}

export default new UserController
