import mongoose from 'mongoose';
const vehicleDetails = new mongoose.Schema({
    manufacturer: {
        type: String, // Tata, Hyundai, Maruti, Mahindra, Toyota
    },
    model: {
        type: String,
    },
    year: {
        type: Number,
    },
    licensePlate: {
        type: String,
    },
    color: {
        type: String,
    },
    vehicleClass: {
        type: String,
        enum: ["Bike", "Rickshaw", "mini", "premius", "xl"],
    },
    fare: {
        type: Number,
    },
    driverId: {
        type: mongoose.Types.ObjectId,
        ref: "Driver",
    }
});
export default mongoose.model('Vehicle', vehicleDetails);
