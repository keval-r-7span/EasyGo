import express from 'express';
const router = express.Router();

import {
  signUp,
  verifyOtp, 
  sendLoginOtp,
  login,
  deleteDriver,
  updateDriver,
  availableDrivers,
  addVehicle,
  updateVehicle,
  getDriver,
  getDriverByID,
} from '../controllers/driverController';

import { validateRequest, validateAddVehicle } from '../validation/driverValidation';
import { validateUpdateRequest, validateUpdateVehicle } from '../validation/updateValidation';

router.post('/signup', validateRequest, signUp);
router.post('/verify-otp', verifyOtp);
router.post('/send-login-otp', sendLoginOtp);
router.post('/login', login);
router.put('/:id', validateUpdateRequest, updateDriver);
router.delete('/:id', deleteDriver);
router.post('/vehicle', validateAddVehicle, addVehicle);
router.put('/vehicle/:id', validateUpdateVehicle, updateVehicle);
router.get('/', availableDrivers);
router.get('/getall', getDriver);
router.get('/:id', getDriverByID);

export default router;