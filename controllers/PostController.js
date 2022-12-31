import Post from "../model/Post.js";
// import ApiError from "../error/ApiError.js";

class PostController {
    async createPost(req, res, next) {
        const { isArchive, isPinned, title, description } = req.body;
        if (!isArchive || !isPinned || !title || !description) {
            return res.status(500).json("Hamma malumotlarni kiriting")
        }
        const post = await Post.create({ isArchive, isPinned, title, description })
        return res.status(201).json(post)
    }

  async getAllPost(req, res) {
        const { search = "" } = req.query;
        const post = await Post.find({ isArchive: "false", isPinned: "false" }).sort({ $natural: -1 })
        if (!search) {
            return res.status(200).json(post)
        } else {
            const filter = post.filter(el => el.title == search || el.description == search)
            return res.status(200).json(filter)
        }
    }
    
    async updateById(req, res) {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        return res.status(200).json(post)
    }

    async getById(req, res) {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post)
    }

    async deletePost(req, res) {
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json("o'chirildi")
    }

    async getPinned(req, res, next) {
        const post = await Post.find({ isPinned: "true" }).sort({ $natural: -1 })
        return res.status(200).json(post)
    }
    async getArchive(req, res, next) {
        const post = await Post.find({ isArchive: "true", }).sort({ $natural: -1 })
        return res.status(200).json(post)
    }

    async setNotification(req, res) {
        const newNotification = {
            isHave: req.body.isHave,
            year: req.body.year,
            day: req.body.day,
            month: req.body.month,
            hour: req.body.hour,
            minutes: req.body.minutes,
        }
        const post = await Post.findById(req.params.id)
        await post.updateOne({ $push: { notification: newNotification } })
        return res.status(200).json("eslatma belgilandi")
    }

    async addToArchive(req, res) {
        const post = await Post.findOneAndUpdate(req.params.id, {
            isArchive: "true"
        }, { new: true })
        return res.status(200).json("archivega qo'shildi")
    }
    async backFromArchive(req, res) {
        const post = await Post.findOneAndUpdate(req.params.id, {
            isArchive: "false"
        }, { new: true })
        return res.status(200).json("archivedan olindi")
    }

    async addToPinned(req, res) {
        const post = await Post.findOneAndUpdate(req.params.id, {
            isPinned: "true"
        }, { new: true })
        return res.status(200).json("pinnedga qo'shildi")
    }
    async backFromPinned(req, res) {
        const post = await Post.findOneAndUpdate(req.params.id, {
            isPinned: "false"
        }, { new: true })
        return res.status(200).json("pinneddan olindi")
    }
}

export default new PostController
