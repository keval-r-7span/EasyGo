const { trueResponse, falseResponse } = require("../configs/responseMes");
const customerService = require("../services/userService");
const CustomerSchema = require("../models/customerModel");
const bcrypt = require("bcryptjs");
const jwtToken = require("../validator/jwtToken");
const { JWT } = require("../helper/constants");
const logger = require("../configs/mailTransport");

const signUp = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    const userExist = await customerService.findCustomer({ email });
    // console.log(userExist);
    logger.info(userExist);
    if (userExist) {
      throw new Error("User Already exist with same Email: " + { email });
    }
    if (role !== "admin") {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await customerService.registerUser({
        name,
        email: email.toLowerCase(),
        phoneNumber,
        password: hashedPassword,
        role,
      });
      await response.save();
      return trueResponse(res, response);
    } else {
      return res.status(400).json({
        success: false,
        message: "Enter valid role",
      });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await customerService.registerUser({
        name,
        email: email.toLowerCase(),
        phoneNumber,
        password: hashedPassword,
        role,
      });
      await response.save();
      return res.status(200).json({
        success: true,
        data: response,
        message: "User created successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in signUp "+error,
    });
  }
};

// const resetPassword = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const existNumber = await customerService.findCustomer({ phoneNumber });
//     if (!existNumber) {
//       console.log("Please Register first");
//     } else {
//       //sendotp
//       //verifyotp
//       const newHashedPassword = await bcrypt.hash(password, 10);
//       const updatePassword = await customerService.newPassword(
//         { password: hashedPassword },
//         { $set: { password: newHashedPassword } }
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return falseResponse(res);
    }
    let registeredUser = await customerService.findCustomer({ phoneNumber });
    if (!registeredUser) {
      return res.json({
        success: false,
        message: "Please Register First",
      });
    }
  } catch (error) {
    return falseResponse(res, error);
  }
};

// const forgotPassword = async (req, res, next) => {
//   const {email} = req.body
//   //Get USer based on email
//   const user = await customerService.findCustomer({email})
//   if(!user){
//     console.log("email Doesn't exist");
//     next()
//   }
//   //generate random reset token and save it in db
//   const resetToken = user.createPasswordToken()
//   console.log("resetToken");
//   await CustomerSchema.save()
//   //Send token back to user email
// }

// exports.resetPassword = (req, res, next) => {
// }

module.exports = {
  signUp,
  login,
  // forgotPassword
  // resetPassword
};
