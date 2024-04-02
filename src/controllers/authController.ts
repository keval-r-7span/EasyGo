import { Request, Response, response } from "express";
import { customerService } from "../services/userService";
import { TWILIO } from "../helper/constants";
import twilio from "twilio";
import jwtToken from "../validation/jwtToken";
const client = twilio(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);

const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, role } = req.body;
    const userExist = await customerService.findCustomer({ phoneNumber });
    if (userExist) {
      throw new Error("User Already exist with phoneNumber");
    }
    if (role !== "admin") {
      const response = await customerService.registeruserTemp({
        name,
        email: email.toLowerCase(),
        phoneNumber,
        role,
      });
      if (!response) {
        return res.status(400).json({
          success: false,
          message: "Invalid Data",
        });
      }
      const otpResponse = await sendOtp(phoneNumber);
      if (!otpResponse.success) {
        throw new Error("Failed to send OTP");
      }
      await response.save();
      return res.status(200).json({
        success: true,
        message: "OTP sent Please verify within 10 minutes",
      });
    } else {
      return res.status(400).json({
        sucess: false,
        message: "Role Should not be selected as Admin",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error occured at Sign-Up "+error,
    });
  }
};

const sendOtp = async (phoneNumber: string) => {
  try {
    const fourDigit = phoneNumber.substring(5, 9);
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verifications.create({
        to: `+91${phoneNumber}`,
        channel: "sms",
      });
    return {
      success: true,
      data: response,
      message: `OTP successfully sent to mobile Number ending with ${fourDigit}`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error occurred while sending OTP",
    };
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber && !otp) {
    return res.status(400).json({
      success: false,
      message: "Please Enter phone and otp",
    });
  }
  try {
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      });
    if (response.status === "approved") {
      const existUserTemp = await customerService.findPhoneNumber({
        phoneNumber,
      });
      if (existUserTemp) {
        const newUser = await customerService.registerUser({
          name: existUserTemp.name,
          email: existUserTemp.email,
          phoneNumber: existUserTemp.phoneNumber,
          role: existUserTemp.role,
        });
        await newUser?.save();
        await customerService.removeTempUser(existUserTemp.id);
      }
    }
    return res.status(201).json({
      success: true,
      message: "Successfully Verified and Registered ",
    });
  } catch (error) {
    return res.json({
      sucess: false,
      message: "Error occured while verifying otp" + error,
    });
  }
};

const sendLoginOtp = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const fourDigit = phoneNumber.substring(6, 10);
  let registeredUser = await customerService.findCustomer({ phoneNumber });
  if (!registeredUser) {
    return res.status(404).json({
      sucess: false,
      message: `No user exist with such ${phoneNumber} please Sign-Up first!!`,
    });
  } else {
    try {
      const response = await client.verify.v2
        .services(TWILIO.SERVICE_SID)
        .verifications.create({
          to: `+91${phoneNumber}`,
          channel: "sms",
        });
      return res.status(200).json({
        sucess: true,
        message: `OTP successfully sent to mobile Number ending with ${fourDigit}`,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        data: "Error occured at sending OTP",
      });
    }
  }
};

const login = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;
  try {
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      });
    if (response.status === "approved") {
      const existUser = await customerService.findCustomer({ phoneNumber });
      if (!existUser) {
        return res.status(400).json({
          success: false,
          message: "Oops!! Sign-Up first",
        });
      } else {
        const token = jwtToken(existUser);
        existUser.token = token;
        return res
          .cookie("token", token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly:true })
          .status(200).json({
            success: true,
            message: "User Logged in successfully",
          });
      }
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error occured while verifying otp "+error,
    });
  }
};

export { signUp, verifyOtp, sendLoginOtp, login };
