import mongoose,{Document} from 'mongoose';

interface ImageObject {
  name: string;
  imageUrl: string;
}
export interface driver extends Document {
  name: string;
  email: string; 
  phoneNumber: string; 
  availability: boolean;
  role: string; 
  token: string; 
  images:ImageObject[]
}

const driverSchema = new mongoose.Schema<driver>({
  name: {
    type: String,
    required:true
  },
  email: {  
    type: String,
    unique: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  role:{
    type: String,
    enum: ["admin", "driver", "user"],
    default: 'driver'
  },
  availability: {
    type: Boolean,
    default: true
  },
  images: [
    {
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }
  ],
  token: {
    type: String,
  },
});

export default mongoose.model<driver>("driver", driverSchema);
