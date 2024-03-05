const  mongoose  = require('mongoose');
const {DB_URL} = require('../helper/constant')
// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
};

module.exports = connectDB;