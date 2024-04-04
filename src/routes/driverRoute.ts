import express from 'express';
const router = express.Router();

import {
  signUp,
  login,
  deleteDriver,
  updateDriver,
  availableDrivers,
  addVehicle,
  updateVehicle,
} from '../controllers/driverController';

import { validateRequest, validateAddVehicle } from '../validation/driverValidation';
import { validateUpdateRequest, validateUpdateVehicle } from '../validation/updateValidation';

router.post('/register', validateRequest, signUp);
router.post('/login', login);
router.put('/update/:id', validateUpdateRequest, updateDriver);
router.delete('/delete/:id', deleteDriver);
router.post('/addvehicle', validateAddVehicle, addVehicle);
router.put('/vehicle/:id', validateUpdateVehicle, updateVehicle);
router.get('/available', availableDrivers);

export default router;