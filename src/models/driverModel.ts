import mongoose from 'mongoose';

export interface driver {
  name: string;
  email: string; 
  phoneNumber: string; 
  // availability: 'available' | 'unavailable';
  // password: string;
  role: 'admin' | 'driver' | 'user'; 
  // token?: string; 
}

const driverSchema = new mongoose.Schema<driver>({
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
  // availability: {
  //   type: String,
  //   enum: ['available', 'unavailable'],
  //   default: 'unavailable'
  // },
  role:{
    type: String,
    enum: ["admin", "driver", "user"],
    default: "driver"
  },
  // token: {
  //   type: String,
  // },
  
});

export default mongoose.model<driver>("driver", driverSchema);
