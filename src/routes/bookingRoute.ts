import { Router } from 'express';
const router = Router()

import {
 viewBooking,createBooking,updateBooking,cancelBooking,bookingStatus,viewBookingById,getRevenue,totalBooking
} from '../controllers/bookingController';
import validateRequest from '../validation/bookingValidation';

router.get("/list", viewBooking);
router.get("/status", bookingStatus);
router.get("/:id", viewBookingById);
router.post("/",validateRequest,createBooking);
router.put("/:id", updateBooking);
// router.delete("/cancel/:id", cancelBooking);
router.get("/revenue/total", getRevenue);
router.get("/monthly/total",totalBooking)

export default router