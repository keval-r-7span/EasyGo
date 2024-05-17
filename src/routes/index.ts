import express from 'express';
const router = express()
import bookingRoute from './bookingRoute'
import driverRoute from './driverRoute'
import customerRoute from './customerRoute'
import paymentRoute from './paymentRoute'

router.use("/booking",bookingRoute)
router.use('/user',customerRoute)
router.use('/driver',driverRoute)
router.use('/payment',paymentRoute)

export default router;
