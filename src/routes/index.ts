import express from 'express';
const router = express()
import paymentRoute from './paymentRoute'
import driverRoute from './driverRoute';
import booking from './bookingRoute'

router.use('/payment',paymentRoute)
router.use('/booking',booking)

export default router;
