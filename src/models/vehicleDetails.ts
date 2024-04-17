import mongoose from 'mongoose';

interface driver {
  _id: mongoose.Schema.Types.ObjectId;
}

interface vehicle {
  model: string; 
  year: number;
  licensePlate: string;
  vehicleClass: 'Bike' | 'Auto' | 'Mini' | 'Premium' | 'XL';
  driverId: driver | string;
}

const vehicleDetails = new mongoose.Schema<vehicle>({
  driverId: {
    type: mongoose.Types.ObjectId,
    ref: "Driver",
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
  vehicleClass: {
    type: String,
    enum: ["Bike", "Auto", "Mini", "premium", "XL"],
  },
  
});

export default mongoose.model<vehicle>('Vehicle', vehicleDetails);
