import express from 'express';
const router = express()

import bookingRoute from './bookingRoute'
import customerRoute from './customerRoute'

router.use("/booking",bookingRoute)
router.use("/user",customerRoute)


export default router