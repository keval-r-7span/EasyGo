//App
const express = require('express')
const router = express.Router();
const { 
       deleteCustomer, 
       updateCustomer, 
       getCustomer, 
       getCustomerByID} = require('../controllers/customerController')
const {
       signUp,
       login} = require('../controllers/authController')
const {sendOTP, 
       verifyOtp} = require('../controllers/otpAuth')
const validateRequest = require('../validation/userValidation')

// mapping with controllers
router.post('/register',validateRequest, signUp);
router.post('/login', login)
router.get('/view', getCustomer);
router.get('/view/:id', getCustomerByID);
router.put('/update/:id', updateCustomer);
router.delete('/delete/:id', deleteCustomer);
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOtp)

module.exports = router;