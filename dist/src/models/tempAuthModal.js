import mongoose from "mongoose";
const tempAuthSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "driver", "user"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 120
    }
}, { timestamps: true });
export default mongoose.model("tempAuth", tempAuthSchema);
