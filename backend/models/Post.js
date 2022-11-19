import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    accountId: {
        type: mongoose.Types.ObjectId,
        ref: "account",
    },
    content: String,
    likes: { type: [mongoose.Types.ObjectId], ref: "account", default: [] },
    comments: { type: [mongoose.Types.ObjectId], ref: "comment", default: [] },
    url: "",
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("post", postSchema);
