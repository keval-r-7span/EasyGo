import { driverService } from '../services/driverService';
import { vehicleService } from '../services/vehicleService';
import bcrypt from 'bcryptjs';
import { Request, Response , NextFunction} from "express";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, vehicleDetails, password, role } =
      req.body;
    const userExist = await driverService.findDriver({ phoneNumber });
    if (userExist) {
      throw new Error("User Already exist with same phoneNumber");
    }
    if (role !== "driver" && role == "") {
      return res.status(400).json({
        success: false,
        message: "check your role",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await driverService.registerUser({
      name,
      email: email.toLowerCase(),
      phoneNumber,
      vehicleDetails,
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
      message: "Something went wrong in signUp " + error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(500).json({
        success: false,
        message: "Please enter proper info! ",
      });
    }
    const registeredUser = await driverService.findDriver({ phoneNumber });
    if (!registeredUser) {
      return res.json({
        success: false,
        message: "Please Register First",
      });
    } else {
      return res.json({
        success: true,
        message: "User is successfully logged in",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

const sendOtp = async (phoneNumber: string) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, availability, vehicleDetails } = req.body;
    const response = await driverService.updateDriver(
      id,
      { name, phoneNumber, availability, vehicleDetails }
    );
    return res.status(200).json({
      success: true,
      message: `OTP successfully sent to mobile Number ending with`,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber && !otp) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Phone number and otp",
    });
  }
};

export const availableDrivers = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const availableDrivers = await driverService.availableDrivers();
    res.status(200).json({
      success: true,
      message: "Successfully Verified and Registered ",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error
    });
  }
};

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const { manufacturer, model, year, licensePlate, color, vehicleClass, driverId } = req.body;
    const vehicleExist = await vehicleService.findVehicle({ licensePlate });
    if (vehicleExist) {
      throw new Error("vehicle Already exist with same licensePlate");
    }
    const response = await vehicleService.addVehicle({
      manufacturer, model, year, licensePlate, color, vehicleClass, driverId,
      fare: 0,
      save: function (): unknown {
        throw new Error('Function not implemented.');
      }
    });
    await response.save();
    return res.status(200).json({
      success: true,
      data: response,
      message: "vehicle added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while addind vehicle " + error,
    });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { manufacturer, model, year, licensePlate, color, vehicleClass } =
      req.body;
    const response = await vehicleService.updateVehicleDetails(
      id,
      { manufacturer, model, year, licensePlate, color, vehicleClass }
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "vehicle details updated Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

export const getDriver = async (req: Request, res: Response) => {
  try {
    const response = await driverService.viewDriver();
    return res.status(200).json({ 
      sucess: true, 
      data: response });
  } catch (error) {
    return res.json({
      sucess: false,
      message: "Error in GetDriver"+error,
    });
  }
};

export const getDriverByID = async (req: Request, res: Response) => {
  try {
    const response = await driverService.viewDriverById(req.params.id);
    return res.status(200).json({
      sucess: true,
      data: response,
    });
  } catch (error) {
    return res.json({
      sucess: false,
      message: "Error in GetDriver ID" + error,
    });
  }
};

export { signUp, verifyOtp, sendLoginOtp, login };