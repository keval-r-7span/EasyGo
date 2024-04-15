import Joi from 'joi';
import mongoose, { Document } from 'mongoose';

export interface Booking extends Document {
  customer: mongoose.Schema.Types.ObjectId;
  driver: mongoose.Schema.Types.ObjectId;
  vehicleClass: 'Bike' | 'Rickshaw' | 'Mini' | 'Premiue' | 'XL';
  pickupLocation: string;
  dropoffLocation:string;
  pickupTime:Date;
  dropoffTime:Date;
  fare: number;
  rating:number;
  status: string;
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
    vehicleClass: {
      type: String,
      enum: ["Bike", "Rickshaw", "Mini", "Premiue", "XL"],
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

export const bookingJoiSchema= Joi.object({
  customer:Joi.string(),
  driver:Joi.string(),
  vehicleClass:Joi.string(),
  pickupLocation: Joi.string().min(3).max(100).required(),
  dropoffLocation: Joi.string().min(3).max(100).required(),
  pickupTime: Joi.string().required().default(Date.now()),
  status: Joi.string().lowercase(),
  fare: Joi.number().required(),
  rating: Joi.number(),
  comments: Joi.string(),
});

export default mongoose.model<Booking>("Booking", bookingSchema);
