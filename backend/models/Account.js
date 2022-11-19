import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        min: 6,
    },
    name: {
        type: String,
    },

    address: {
        type: String,
    },
    gender: {
        type: String,
        default: "male",
    },
    phoneNumber: {
        type: String,
    },
    story: {
        type: String,
    },
    urlAvatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("account", accountSchema);
