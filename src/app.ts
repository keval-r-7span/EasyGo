import express,{Request,Response} from 'express';
import connectDB from './configs/dbConnection';
import indexRoute from './routes/index';
import {PORT} from './helper/constants';
import logger from './utils/logger';

const app = express();

app.use(express.json());

// Define routes
app.use("/api/v1", indexRoute);

app.get("/",(req:Request,res:Response)=>{
  res.status(200).send("Welcome to RideWithMe-API 🚕")
})

app.use((req:Request,res:Response)=>{
  res.status(404).json({sucess:false,message:"Bad Gateway"})
})
// Connect to MongoDB Atlas .
connectDB();

// Start the server
app.listen(PORT, ():void => {
  logger.info(`🚀 Server is running!! on http://localhost:${PORT}🚀..`);
});
