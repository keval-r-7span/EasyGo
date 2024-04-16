import mongoose,{Document} from 'mongoose';

export interface driver extends Document {
  name: string;
  email: string; 
  phoneNumber: string; 
  availability: boolean;
  role: string; 
  token: string; 
  verificationStatus: 'Pending' | 'Verified';
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
  token: {
    type: String,
  },
  verificationStatus: {
    type: String,
    enum: ["Pending", "Verified"]
  }
});

export default mongoose.model<driver>("driver", driverSchema);