import mongoose from "mongoose";

export interface Customer{
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    token: string;
    resetPasswordExpires: Date;
    location: {
      type: string; 
      coordinates: [number, number];
  };
}

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
}, { _id: false });

const CustomerSchema = new mongoose.Schema<Customer>(
    {
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
      // resetPasswordExpires: {
      //   type: Date,
      // },
      location: {
        type: locationSchema,
        required: false
    },
    },
    { timestamps: true }
  );
  
  CustomerSchema.index({location: "2dsphere"})

  export default mongoose.model<Customer>("Customer", CustomerSchema);