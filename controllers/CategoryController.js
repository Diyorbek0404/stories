import ApiError from "../error/ApiError.js";
import Category from "../model/Category.js";

class CategorryController {
    async createCategory(req, res, next) {
        const newCategory = new Category(req.body)
        if (newCategory) {
            const post = await newCategory.save();
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Toifa qo'shishda qo'shishda xato"))
    }

    async getAllCategory(req, res) {
        const category = await Category.find()
        return res.status(200).json(category)
    }
}

export default new CategorryController
