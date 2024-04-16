import express from "express";
const router = express.Router();

import {
  signUp,
  verifyOtp,
  sendLoginOtp,
  login,
} from "../controllers/driverAuthController";

import {
  getDriver,
  getDriverByID,
  addVehicle,
  updateVehicle,
  updateDriver,
  deleteDriver,
  availableDrivers,
  imageUpload,
} from "../controllers/driverController";

// import {
//   validateRequest,
//   validateAddVehicle,
// } from "../validation/driverValidation";

// import {
//   validateUpdateRequest,
//   validateUpdateVehicle,
// } from "../validation/updateValidation";

// router.post("/register", validateRequest, signUp);
router.post("/register", signUp);
router.post("/verify-otp", verifyOtp);
router.post("/send-login-otp", sendLoginOtp);
router.post("/login", login);
router.get("/upload", imageUpload);
router.get("/available/list", availableDrivers);
// router.post("/addvehicle", validateAddVehicle, addVehicle);
router.post("/addvehicle", addVehicle);
// router.put("/vehicle/:id", validateUpdateVehicle, updateVehicle);
router.put("/vehicle/:id", updateVehicle);
router.get("/", getDriver);
router.get("/:id", getDriverByID);
// router.put("/:id", validateUpdateRequest, updateDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;