import { Router } from "express";
const router = Router();
import {viewBooking,updateBooking,deleteBooking,createBooking} from '../controllers/bookingController'
import {validateRequest} from '../validation/joiValidation';
import { verifyToken } from "../middleware/authMiddleware";

router.get('/list',verifyToken,viewBooking)
router.post('/',verifyToken,validateRequest,createBooking)
router.put('/:id',updateBooking)
router.delete('/:id',deleteBooking)

export default router