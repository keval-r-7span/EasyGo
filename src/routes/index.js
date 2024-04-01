const express = require("express");
const router = express()
const bookingRoute = require('./bookingRoute')
const customerRoute = require('./customerRoute')
const driverRoute = require('./driverRoute')

router.use("/booking",bookingRoute)
router.use("/user",customerRoute)
router.use("/driver",driverRoute)

module.exports = router