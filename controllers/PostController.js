import Post from "../model/Post.js";
import ApiError from "../error/ApiError.js";

class PostController {
    async createPost(req, res, next) {
        const newPost = new Post(req.body)
        if (newPost) {
            const post = await newPost.save();
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Post qo'shishda xato"))
    }

    async getAllPost(req, res) {
        let { day = '', year = '', month = "", _id = "" } = req.query
        const post = await Post.find().sort({ $natural: -1 })
        if (!year && !day && !month && !_id) {
            return res.json("hech bo'lmasa idni kiriting")
        } else if (_id && !year && !day && !month) {
            let found = post.filter(el => el.userId == _id)
            return res.json(found)
        } else if (year && _id && !month && !day) {
            let found = post.filter(el => el.year == year && el.userId == _id)
            return res.json(found)
        } else if (month && _id && !year && !day) {
            let found = post.filter(el => el.month == month && el.userId == _id)
            return res.json(found)
        } else if (day && _id && !year && !month) {
            let found = post.filter(el => el.day == day && el.userId == _id)
            return res.json(found)
        } else {
            let found = post.filter(el => el.year == year && el.userId == _id && el.day == day && el.month == month)
            return res.json(found)
        }
    }

    async getById(req, res) {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post)
    }

    async deletePost(req, res) {
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json("o'chirildi")
    }

    async likePost(req, res, next) {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            return res.status(200).json("bu videoni yoqtirdingiz")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            return res.status(200).json("bu siz likeni olib tashladingiz")
        }
    }
}

export default new PostController
