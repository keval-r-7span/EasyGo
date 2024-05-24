import mongoose from "mongoose";
import Joi from "joi";
export interface Customer{
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    token: string;
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
    },
    { timestamps: true }
  );
  
const phonePattern = /^(0|91)?[6-9][0-9]{9}$/
export const userJoiSchema= Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(10).regex(phonePattern).required(),
  role: Joi.string(),
  location: Joi.object()
});

CustomerSchema.index({location: "2dsphere"})

  export default mongoose.model<Customer>("Customer", CustomerSchema);
