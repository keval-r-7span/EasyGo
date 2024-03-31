import mongoose, {Document} from "mongoose";

export interface Customer extends Document {
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
        // unique: true,
      },
      phoneNumber: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
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
      //penalty
      // profile-->gender,
    },
    { timestamps: true }
  );
  
  export default mongoose.model<Customer>("Customer", CustomerSchema);
  