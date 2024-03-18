const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  deleteDriver, 
  updateDriver,
  availableDrivers
} = require('../controllers/driverController');

  router.post('/register', signUp);
  router.post('/login', login);
  router.delete('/delete/:id', deleteDriver);
  router.put('/update/:id', updateDriver);
  router.get('/available', availableDrivers);

module.exports = router;