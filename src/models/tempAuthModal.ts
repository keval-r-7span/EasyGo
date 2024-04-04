import mongoose from "mongoose";

export interface tempAuth{
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt: Date,
    location: {
      type: string; 
      coordinates: [number];
  };
}

const tempAuthSchema = new mongoose.Schema<tempAuth>(
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
      location: {
        type: { type: String, default: "Point" }, 
        coordinates: {
          Longitude: Number,
          Latitude: Number
        }, //long, lat
    },
      createdAt:{
        type: Date,
        default: Date.now(),
        expires: 120
      }
    },
    { timestamps: true }
  );
  
  export default mongoose.model<tempAuth>("tempAuth", tempAuthSchema);
  