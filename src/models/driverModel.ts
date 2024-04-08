import mongoose,{Document} from 'mongoose';

export interface driver extends Document {
  name: string;
  email: string; 
  phoneNumber: string; 
  availability: boolean;
  role: string; 
  token: string; 
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
  role:{
    type: String,
    enum: ["admin", "driver", "user"],
    default: 'driver'
  },
  availability: {
    type: Boolean,
    default: true
  },
  token: {
    type: String,
  },
});

export default mongoose.model<driver>("driver", driverSchema);
