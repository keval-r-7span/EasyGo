import express from 'express';
const router = express.Router();

import {
  signUp, 
  verifyOtp, 
  sendLoginOtp, 
  login
} from '../controllers/driverAuthController';

import {
  getDriver,
  getDriverByID,
  addVehicle,
  updateVehicle,
  updateDriver,
  deleteDriver,
  imgUpload
  // availableDrivers
} from '../controllers/driverController';

import {
  validateRequest, 
  validateAddVehicle 
} from '../validation/driverValidation';

import { 
   validateUpdateRequest, 
   validateUpdateVehicle 
} from '../validation/updateValidation';
import {upload} from '../middleware/multer';

router.post('/register', validateRequest, signUp);
router.post("/verify-otp", verifyOtp);
router.post("/send-login-otp", sendLoginOtp);
router.post('/login', login);
router.get("/", getDriver);
router.get("/:id", getDriverByID);
router.post('/addvehicle', validateAddVehicle, addVehicle);
router.put('/vehicle/:id', validateUpdateVehicle, updateVehicle);
router.put('/update/:id', validateUpdateRequest, updateDriver);
router.delete('/delete/:id', deleteDriver);
router.post('/upload',upload,imgUpload)


export default router;