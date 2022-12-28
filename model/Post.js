import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    isArchive: {
        type: String,
        required: true
    },
    isPinned: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notification: [{
        isHave: String,
        year: "String",
        day: Number,
        month: "String",
        hours: Number,
        minutes: Number
    }]
}, {
    timestamps: true
})

export default mongoose.model("Post", PostSchema)