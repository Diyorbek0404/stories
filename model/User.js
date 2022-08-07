import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "User"
    }
}, {
    timestamps: true
})

export default mongoose.model("User", UserSchema)