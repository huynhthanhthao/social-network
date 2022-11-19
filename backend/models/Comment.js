import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
    accountId: {
        type: mongoose.Types.ObjectId,
        ref: "account",
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "post",
    },
    content: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("comment", commentSchema);
