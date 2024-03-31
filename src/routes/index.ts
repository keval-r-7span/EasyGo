import express from 'express';
const router = express()

import bookingRoute from './bookingRoute'

router.use("/booking",bookingRoute)


export default router