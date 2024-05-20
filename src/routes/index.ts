import express from 'express';
const router = express()
import paymentRoute from './paymentRoute'

router.use('/payment',paymentRoute)

export default router;
