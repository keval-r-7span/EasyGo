import { Router } from 'express';
const router = Router()

import {
 viewBooking,createBooking,updateBooking,cancelBooking,bookingStatus,viewBookingById,getRevenue,totalBooking,changeRideStatus,paymentStatus
} from '../controllers/bookingController';
import validateRequest from '../validation/bookingValidation';

router.get("/list", viewBooking);
router.get("/status", bookingStatus);
router.get("/:id", viewBookingById);
router.get("/revenue/total", getRevenue);
router.get("/monthly/total",totalBooking)
router.post("/create",validateRequest,createBooking);
router.post("/:id/completed", changeRideStatus);
router.put("/update/:id", updateBooking);
router.post("/payment/status/:id", paymentStatus);
router.delete("/cancel/:id", cancelBooking);

export default router
