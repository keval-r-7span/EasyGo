import { Router } from "express";
const router = Router();
import {viewBooking,updateBooking,deleteBooking,createBooking} from '../controllers/bookingController'

router.get('/',viewBooking)
router.post('/',createBooking)
router.put('/:id',updateBooking)
router.delete('/:id',deleteBooking)

export default router