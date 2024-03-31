import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
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
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, { timestamps: true });
export default mongoose.model("Customer", CustomerSchema);
