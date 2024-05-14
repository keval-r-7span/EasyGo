import { Router } from 'express';
const router = Router()
import {payment_checkout} from '../controllers/paymentController'

router.post('/checkout',payment_checkout)


export default router;