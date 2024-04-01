import mongoose from "mongoose";

export interface Customer{
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    token: string;
    resetPasswordExpires: Date
}

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
      resetPasswordExpires: {
        type: Date,
      },
    },
    { timestamps: true }
  );
  
  export default mongoose.model<Customer>("Customer", CustomerSchema);
  