import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    username:{
        type:String,
    },
    stories:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    day:{
        type:Number,
        required:true
    },
}, {
    timestamps: true
})

export default mongoose.model("Post", PostSchema)