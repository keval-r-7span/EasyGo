import express from 'express';
const router = express()
import customerRoute from './userRoute'

router.use('/user',customerRoute)

export default router