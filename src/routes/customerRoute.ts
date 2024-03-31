import { Router } from "express";
const router = Router();

import {
  getCustomer,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController";
import { signUp, login} from "../controllers/authController";
import { sendOtp, verifyOtp } from "../controllers/otpAuth";
import validateRequest from "../validation/userValidation";
import { verifyToken } from "../middleware/authMiddleware";

router.post("/register", validateRequest ,signUp);
router.post("/login", login);
router.get("/view", getCustomer);
router.get("/view/:id", getCustomerByID);
router.put("/update/:id", verifyToken,updateCustomer);
router.delete("/delete/:id", deleteCustomer);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
// router.get("/maps/distance", calcDistance);

export default router