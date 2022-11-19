import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDatabase = async function () {
    try {
        const uri = `mongodb://localhost:27017/social-media`;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connect Database Successfully!");
    } catch (error) {
        console.log(error);
    }
};

export default connectDatabase;
