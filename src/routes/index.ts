import express from 'express';
const router = express()
import bookingRoute from './bookingRoute'
import driverRoute from './driverRoute'
import customerRoute from './customerRoute'

router.use("/booking",bookingRoute)
router.use('/user',customerRoute)
router.use('/driver',driverRoute)

export default router