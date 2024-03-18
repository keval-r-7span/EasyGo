const customerService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT } = require("../helper/constants");

const signUp = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    const userExist = await customerService.findCustomer({ email });
    if (userExist) {
      throw new Error("User Already exist with same Email");
    }
    if (role === "admin") {
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

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(500).json({
        success: false,
        message: "Please enter proper info! ",
      });
    }
    let registeredUser = await customerService.findCustomer({ phoneNumber });
    if (!registeredUser) {
      return res.json({
        success: false,
        message: "Please Register First",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login " + error,
    });
  }
};

module.exports = {
  signUp,
  login,
};
