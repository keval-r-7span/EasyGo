import express from 'express';
import connectDB from './configs/dbConnection';
import indexRoute from './routes/indexRoute';
import {PORT} from './helper/constants';
import logger from './utils/logger';

const app = express();

app.use(express.json());

// Define routes
app.use("/api/v1", indexRoute);

// Connect to MongoDB Atlas .
connectDB();

// Start the server
app.listen(PORT, () => {
  logger.info(`🚀 Server is running.. on http://localhost:${PORT}🚀..`);
});