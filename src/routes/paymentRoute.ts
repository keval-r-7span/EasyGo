import { Router } from 'express';
const router = Router()
import {payment_checkout} from '../controllers/paymentController'
import {totalBooking,getRevenue} from '../controllers/bookingController'

router.post('/checkout',payment_checkout)
router.get('/revenue',getRevenue)
router.get('/total',totalBooking)

export default router;