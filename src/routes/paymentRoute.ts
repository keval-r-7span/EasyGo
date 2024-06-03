import { Router } from 'express';
const router = Router()
import {payment_checkout,getallPayment} from '../controllers/paymentController'
import {totalBookings,getRevenues} from '../controllers/bookingController'

router.post('/checkout',payment_checkout)
router.get('/revenue',getRevenues)
router.get('/total',totalBookings)
router.get('/',getallPayment)

export default router;