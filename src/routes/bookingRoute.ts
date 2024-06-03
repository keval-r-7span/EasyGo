import { Router } from "express";
const router = Router();
import {viewBookings,updateBookings,deleteBookings,createBookings} from '../controllers/bookingController'
import {validateRequest} from '../validation/joiValidation';

router.get('/list',viewBookings)
router.post('/',validateRequest,createBookings)
router.put('/:id',updateBookings)
router.delete('/:id',deleteBookings)

export default router