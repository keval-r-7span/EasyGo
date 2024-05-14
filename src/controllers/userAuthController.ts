import { Request, Response } from "express";
import { customerService } from "../services/userService";
import { TWILIO } from "../helper/constants";
import twilio from "twilio";
import jwtToken from "../validation/jwtToken";
import radiusCalc from "../utils/radiusCalc";
import { driverService } from "../services/driverService";
import logger from "../utils/logger";
import { sendRequestToDriver } from "../utils/sendRequest";
const client = twilio(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);


const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, location } = req.body;
    const userExist = await customerService.findCustomer({ phoneNumber });
    if (userExist) {
      logger.error("Existing User");
      return res.status(400).json({
        isLogin: false,
        message: "User Already exist.",
      });
    }
    const response = await customerService.registerUser({
      name,
      email: email.toLowerCase(),
      phoneNumber,
      role: "user",
      location,
    });
    if (!response) {
      logger.error("Invalid User data");
      return res.status(400).json({
        isLogin: false,
        message: "Invalid Data",
      });
    }
    await response?.save();
    logger.info("user Registered");
    return res.status(201).json({
      isLogin: true,
      message: "user Registered and move to home screen",
    });
  } catch (error) {
    logger.error("Error occured at signing up! ", error);
    return res.status(500).json({
      isLogin: false,
      message: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const lastDigit = phoneNumber.substring(6, 10);
  if (!phoneNumber) {
    logger.error("Invalid Phone number");
    return res.status(404).json({
      isLogin: false,
      message: "Enter PhoneNumber",
    });
  }
  try {
    await client.verify.v2.services(TWILIO.SERVICE_SID).verifications.create({
      to: `+91${phoneNumber}`,
      channel: "sms",
    });
    logger.info(`Otp successfully sent to xxxxxx${lastDigit}`);
    return res.status(200).json({
      isLogin: true,
      message: `OTP successfully sent to mobile Number`,
    });
  } catch (error) {
    logger.error("Error occured while sending otp ", error);
    return res.status(500).json({
      isLogin: false,
      message: `Error in Login`+error,
    });
  }
};

const verify = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    logger.error("Enter valid phone number and otp");
    return res.status(404).json({
      isLogin: false,
      message: "Please Enter valid phone number and otp",
    });
  }
  try {
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      });
    switch (response.status) {
      case "approved": {
        const existUser = await customerService.findCustomer({ phoneNumber });
        if (!existUser) {
          logger.error("No user found");
          return res.status(404).json({
            isLogin: false,
            data: phoneNumber,
            message: "Oops!! Sign-Up first move to signup screen",
          });
        } else {
          const token = jwtToken(existUser);
          existUser.token = token;
          logger.info(`UserID: ${existUser.id} logged in successfully`)
          return res
            .cookie("token", token, {
              maxAge: 3 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .status(200)
            .json({
              isLogin: true,
              token,
              message: "User Logged in successfully",
            });
        }
      }
      default:
        logger.error("OTP enetered is invalid");
        return res.status(400).json({
          isLogin: false,
          message: "Invalid OTP. Please try again.",
        });
    }
  } catch (error) {
    logger.error("Error occured at Login ", error);
    return res.status(500).json({
      isLogin: false,
      message: 'Error in verify OTP'+ error,
    });
  }
};

const requestDrive = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id; 
    const userDetails = await customerService.findLocationByIdUser(userId);
    if (!userDetails) {
      logger.error("User details not found! check your token");
      return res.status(404).json({
        isLogin: false,
        message: "User location not found.",
      });
    }
    const latU = userDetails.location.coordinates[0];
    const longU = userDetails.location.coordinates[1];
    if (!latU && !latU) {
      logger.error("LAT AND LONG UNDEFINED OR NOT FOUND!");
      return res.status(404).json({
        isLogin: false,
        message: "LAT AND LONG UNDEFINED OR NOT FOUND!",
      });
    }

    const availableDrivers = await driverService.availableDrivers();

    if (!availableDrivers) {
      logger.error("NO AVAILABLE DRIVERS FOUND!");
      return res.status(404).json({
        isLogin: false,
        message: "No available drivers found.",
      });
    }
    let driverFoundWithin2Km = false;

    for (const driver of availableDrivers) {
      const latD = driver.location.coordinates[0];
      const longD = driver.location.coordinates[1];
      
      if (!latD && !latD) {
        logger.error("LAT AND LONG UNDEFINED OR NOT FOUND!");
        return res.status(404).json({
          isLogin: false,
          message: "LAT AND LONG UNDEFINED OR NOT FOUND!",
        });
      }

      const Radius = radiusCalc(latU, longU, latD, longD);
      if (Radius < 2) {
        const { name, location } = userDetails;
        if(!name || !location){
          return res.json({
            success: false,
            message: "Unable to fetch user details"
          })
        }
        const coords = location.coordinates
        await sendRequestToDriver(driver.name, { name, coords });
        driverFoundWithin2Km = true;
      } 
    }
    if (driverFoundWithin2Km) {
      logger.info("REQUEST SENT TO DRIVERS WITHIN 2 KM RADIUS");
      return res.status(200).json({
        isLogin: true,
        message: "Requests sent to nearby drivers within 2 km radius.",
      });
    } else {
      logger.info("NO DRIVERS FOUND WITHIN 2 KM RADIUS");
      return res.json({
        isLogin: false,
        message: "No available drivers found within 2 km radius.",
      });
    }
  } catch (error) {
    logger.error("An error occurred while processing the request. ", error);
    return res.status(500).json({
      isLogin: false,
      message: "An error occurred while processing the request.",
    });
  }
};

export { signUp, login, verify, requestDrive };

// import { Request, Response } from "express";
// import { customerService } from "../services/userService";

// // Static phone number and OTP
// const STATIC_PHONE_NUMBER = "9999999999";
// const STATIC_OTP = "9999";

// const signUp = async (req: Request, res: Response) => {
//   try {
//     const { name, email, phoneNumber, role, location } = req.body;
//   if (!name || !email || !phoneNumber || !role || !location) {
//     return res
//       .status(200)
//       .json({ isLogin: false, message: "Enter valid details." });
//   }
//   const userExist = await customerService.findCustomer({ phoneNumber });
//   if (userExist) {
//     return res
//       .status(200)
//       .json({ isLogin: false, message: "User Already exist." });
//   }
//   if (role !== "admin") {
//     const response = await customerService.registeruserTemp({
//       name,
//       email: email.toLowerCase(),
//       phoneNumber,
//       role,
//       location,
//     });
//     if (!response) {
//       return res.status(400).json({
//         isLogin: false,
//         message: "Invalid Data",
//       });
//     }
//     return res.json({
//       isLogin: true,
//       data: response,
//       message: "OTP sent successfully"
//     })
//   }
//   } catch (error) {
//     return res.json({
//       isLogin: false,
//       message:"Error at signing up "+ error
//     })
//   }
// };
// const verifyOtp = async (req: Request, res: Response) => {
//   const { phoneNumber, otp } = req.body;

//   // Check if the provided phone number and OTP match the static values
//   if (phoneNumber === STATIC_PHONE_NUMBER && otp === STATIC_OTP) {
//     // Perform user registration or any other necessary actions here
//     return res.status(200).json({
//       isLogin: true,
//       message: "OTP successfully verified",
//     });
//   } else {
//     return res.status(400).json({
//       isLogin: false,
//       message: "Invalid phone number or OTP",
//     });
//   }
// };

// const sendLoginOtp = async (req: Request, res: Response) => {
//   const { phoneNumber } = req.body;

//   // Check if the provided phone number matches the static value
//   if (phoneNumber === STATIC_PHONE_NUMBER) {
//     // Simulate OTP sent
//     return res.status(200).json({
//       isLogin: true,
//       message: "OTP successfully sent",
//     });
//   } else {
//     return res.status(400).json({
//       isLogin: false,
//       message: "Invalid phone number",
//     });
//   }
// };

// const login = async (req: Request, res: Response) => {
//   const { phoneNumber, otp } = req.body;
//   if (!phoneNumber || !otp) {
//     return res.json({
//       isLogin: false,
//       message: "Enter Valid details",
//     });
//   }
//   try {
//     if(phoneNumber === STATIC_PHONE_NUMBER && otp === STATIC_OTP)
//     return res.json({
//       isLogin: true,
//       message: "successfully logged in",
//     });
//   } catch (error) {
//     return res.json({
//       isLogin: false,
//       message: error,
//     });
//   }
// };

// export { signUp, verifyOtp, sendLoginOtp, login };
