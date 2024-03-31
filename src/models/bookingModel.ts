import mongoose, { Document } from 'mongoose';

export interface Booking extends Document {
  customer: mongoose.Schema.Types.ObjectId;
  driver: mongoose.Schema.Types.ObjectId;
  vehicle:mongoose.Schema.Types.ObjectId;
  vehicleClass: 'Bike' | 'Rickshaw' | 'mini' | 'premius' | 'xl';
  pickupLocation: string;
  dropoffLocation:string;
  pickupTime:Date;
  dropoffTime:Date;
  fare: number;
  rating:number;
  status: string;
  payment_status:string;
  comments:string;
}

const bookingSchema = new mongoose.Schema<Booking>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    vehicle:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    vehicleClass: {
      type: String,
      enum: ["Bike", "Rickshaw", "mini", "premius", "xl"],
      default:'Rickshaw'
    },
    pickupLocation: {
      type: String,
    },
    dropoffLocation: {
      type: String,
    },
    pickupTime: {
      type: Date,
    },
    dropoffTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default:"pending"
    },
    fare: {
      type:Number,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default:"pending"
    },
    rating: {
      type: Number,
    },
    comments: {
      type: String,
      default:"Good Experience"
    },
  },
  { timestamps: true }
);

export default mongoose.model<Booking>("Booking", bookingSchema);
