import express from "express";
const router = express.Router();

import {
  signUp,
  login,
  verify
} from "../controllers/driverAuthController";
import { validateRequest } from "../validation/joiValidation";
import {
  getDriver,
  getDriverByID,
  addVehicleAndSaveImage,
  updateVehicle,
  updateDriver,
  deleteDriver,
  availableDrivers,
  imageUpload,
  bookingOTP,
  verifyBookingOTP
} from "../controllers/driverController";

router.post("/login", login);
router.post("/verify", verify);
router.post("/register", validateRequest,signUp);
// router.post("/register", validateRequest, signUp);
router.get("/upload", imageUpload);
router.get("/available", availableDrivers);
router.post("/addvehicle", addVehicleAndSaveImage);
// router.post("/addvehicle", validateAddVehicle, addVehicleAndSaveImage);
router.put("/vehicle/:id", updateVehicle);
// router.put("/vehicle/:id", validateUpdateVehicle, updateVehicle);
router.get("/", getDriver);
router.get("/:id", getDriverByID);
router.put("/:id", updateDriver);
// router.put("/:id", validateUpdateRequest, updateDriver);
router.delete("/:id", deleteDriver);
router.put('/bookingotp/:id', bookingOTP);
router.post('/verifybookingotp', verifyBookingOTP);

export default router;