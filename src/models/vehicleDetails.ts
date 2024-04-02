import mongoose from 'mongoose';

interface driver {
  _id: mongoose.Schema.Types.ObjectId;
}

interface vehicle {
  manufacturer: string;
  model: string; 
  year: number;
  licensePlate: string;
  color: string;
  vehicleClass: 'Bike' | 'Rickshaw' | 'mini' | 'premius' | 'xl';
  fare: number;
  driverId: driver | string;
}

const vehicleDetails = new mongoose.Schema<vehicle>({
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

export default mongoose.model<vehicle>('Vehicle', vehicleDetails);
