import express from 'express';
import bookingRoute from './bookingRoute'
const router = express()

router.use("/booking",bookingRoute)


export default router