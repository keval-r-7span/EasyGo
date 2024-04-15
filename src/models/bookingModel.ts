import mongoose, { Document } from 'mongoose';
import Joi from 'joi';

export interface Booking extends Document {
  customer: mongoose.Schema.Types.ObjectId;
  driver: mongoose.Schema.Types.ObjectId;
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
  payment_status: Joi.string().lowercase(),
  comments: Joi.string(),
});

export const updateJoiSchema = Joi.object({
  pickupLocation: Joi.string().min(3).max(100).required(),
  dropoffLocation: Joi.string().min(3).max(100).required(),
  vehicleClass:Joi.string(),
})

export default mongoose.model<Booking>("Booking", bookingSchema);
