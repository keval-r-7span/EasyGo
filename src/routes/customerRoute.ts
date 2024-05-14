import { Router } from "express";
const router = Router();
import {
  getCustomer,
  updateCustomer,
  deleteCustomer } from "../controllers/customerController";
import { 
  signUp, 
  login,
  verify, 
  requestDrive } from "../controllers/userAuthController";

import { verifyToken } from "../middleware/authMiddleware";
import calcDistance from "../utils/distance";

router.post("/login", login);
router.post("/verify", verify);
router.post("/register", signUp);
router.get("/maps/distance", calcDistance);
router.get("/:id", getCustomer);
router.put("/:id", verifyToken,updateCustomer);
router.delete("/:id", deleteCustomer);
router.post("/request-drive/", verifyToken, requestDrive)

export default router;