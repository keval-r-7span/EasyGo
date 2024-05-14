import express from 'express';
const router = express()
import customerRoute from './customerRoute'
import paymentRoute from './paymentRoute'

router.use('/user',customerRoute)
router.use('/driver',driverRoute)
router.use('/payment',paymentRoute)

export default router;
