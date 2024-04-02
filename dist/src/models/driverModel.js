import mongoose from 'mongoose';
const driverSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    availability: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'unavailable'
    },
    role: {
        type: String,
        enum: ["admin", "driver", "user"],
        default: "driver"
    },
    token: {
        type: String,
    },
});
export default mongoose.model("driver", driverSchema);
