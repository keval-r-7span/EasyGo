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
  res.status(200).send("Welcome to RideWithMe API")
})
// Connect to MongoDB Atlas .
connectDB();

if (parseInt(process.version.slice(1), 10) < 16) {
  logger.error('Node.js version 16 or higher is required to run this application.');
  process.exit(1); 
}
// Start the server
app.listen(PORT, ():void => {
  logger.info(`🚀 Server is running.. on http://localhost:${PORT}🚀..`);
});
