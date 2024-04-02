import express from 'express';
import connectDB from './configs/dbConnection';
import indexRoute from './routes/index';
import { PORT } from './helper/constants';
import logger from './utils/logger';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
// Define routes
app.use("/api/v1", indexRoute);
app.get("/", (req, res) => {
    res.status(200).send("🚀Welcome to RideWithMe-API 🚕..");
});
// Connect to MongoDB Atlas .
connectDB();
// Start the server
app.listen(PORT, () => {
    logger.info(`🚀 Server is running.. on http://localhost:${PORT}🚀..`);
});
