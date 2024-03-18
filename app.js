const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const indexRoute = require("./src/routes/index");
const { PORT } = require("./src/helper/constants");

const app = express();
app.use(express.json());

// Define routes
app.use("/api/v1", indexRoute);

// Connect to MongoDB Atlas .
connectDB();

// Start the server
app.listen(PORT || 3200, () => {
  console.log(`🚀 Server is running.. on http://localhost:${PORT}🚀`);
});
