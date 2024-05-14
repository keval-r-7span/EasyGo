
import express from "express";
const router = express.Router();

import {
  signUp,
  verify,
  login,
} from "../controllers/driverAuthController";

import {
  getDriver,
  getDriverByID,
  addVehicleAndSaveImage,
  updateVehicle,
  updateDriver,
  deleteDriver,
  availableDrivers,
  imageUpload,
} from "../controllers/driverController";

router.post("/register", signUp);
// router.post("/register", validateRequest, signUp);
router.post("/verify", verify);
router.post("/login", login);
router.get("/upload", imageUpload);
router.get("/available/list", availableDrivers);
router.post("/addvehicle", addVehicleAndSaveImage);
// router.post("/addvehicle", validateAddVehicle, addVehicleAndSaveImage);
router.put("/vehicle/:id", updateVehicle);
// router.put("/vehicle/:id", validateUpdateVehicle, updateVehicle);
router.get("/", getDriver);
router.get("/:id", getDriverByID);
router.put("/:id", updateDriver);
// router.put("/:id", validateUpdateRequest, updateDriver);
router.delete("/:id", deleteDriver);

export default router;
