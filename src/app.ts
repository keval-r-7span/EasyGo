import express,{Request,Response} from 'express';
import connectDB from './configs/dbConnection';
import indexRoute from './routes';
import {PORT} from './helper/constants';
import logger from '../src/utils/logger';
import cors from 'cors'
import {initScheduleJobs} from './utils/cronJobLoc';
const app = express();

app.use(express.json());
app.use(cors())
// Define routes
app.use("/api/v1", indexRoute);

app.get("/",(req:Request,res:Response)=>{
  res.status(200).send("🚀Welcome to EasyGo-API 🚕..")
})
 
app.listen(PORT, ():void => {
  logger.info(`🚀 Server is running.. on http://localhost:${PORT}🚀..`);
  connectDB()
});

initScheduleJobs()

export default app
