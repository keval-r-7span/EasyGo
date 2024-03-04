const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const customerRoute = require('./src/routes/customerRoute')
const adminRoute  = require('./src/routes/adminRoute')

const app = express();
const PORT = process.env.PORT || 3050; // Set port

//middlware use
app.use(express.json())

// Define routes
app.use('/api/v1',adminRoute)
app.use('/api/v1',customerRoute)

// Connect to MongoDB Atlas
connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running.. on http://localhost:${PORT}🚀`);
});
