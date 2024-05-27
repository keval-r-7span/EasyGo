import { driverService } from "../services/driverService";
import { vehicleService } from "../services/vehicleService";
import { Request, Response } from "express";
import { AWS_S3 } from "../helper/constants";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { client } from "../configs/awsS3Client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import logger from "../utils/logger";

export const getDriver = async (req: Request, res: Response) => {
  try {
    const response = await driverService.viewDriver();
    if (!response) {
      logger.error("Unable to Get the Driver.")
      return res.status(404).json({
        success: false,
        message: "Unable to get list of Driver.",
      });
    } else {
      logger.info("Get the list of Driver successfully.")
      return res.status(200).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    logger.error("Error in GetDriver."+error)
    return res.status(500).json({
      success: false,
      message: "Error in GetDriver " + error,
    });
  }
};

export const getDriverByID = async (req: Request, res: Response) => {
  try {
    const response = await driverService.viewDriverById(req.params.id);
    if (!response) {
      logger.error("Invalid ID while get driver.")
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      logger.info("Get Driver by id is successfully.")
      return res.status(200).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    logger.error("Error in GetDriverByID."+ error)
    return res.status(500).json({
      success: false,
      message: "Error in GetCustomer ID " + error,
    });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { model, year, licensePlate, vehicleClass } = req.body;
    const response = await vehicleService.updateVehicleDetails(id, {
      model,
      year,
      licensePlate,
      vehicleClass,
    });
    if (!response) {
      logger.error("Invalid ID while updating Vehicle.");
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      logger.info("Updating Vehicle was success.");
      return res.status(200).json({
        success: true,
        data: response,
        message: "vehicle details updated Successfully.",
      });
    }
  } catch (error) {
    logger.error("Error in UpdateVehicle."+error)
    return res.status(500).json({
      success: false,
      message: "ERROR in Update Vehicle " + error,
    });
  }
};

export const updateDriver = async (req: Request, res: Response) => {
  try {
    const { name, email, isVerified, location } = req.body;
    const response = await driverService.updateDriver(req.params.id, {
      name,
      email,
      isVerified,
      location
    });
    if (!response) {
      logger.error("Invalid ID while updating Driver");
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      logger.info("Updating Driver was success.");
      return res.status(200).json({
        success: true,
        data: response,
        message: "Driver data updated Successfully",
      });
    }
  } catch (error) {
    logger.error("Error in UpdateDriver." + error)
    return res.status(500).json({
      success: false,
      message: "ERROR in Update Driver " + error,
    });
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  try {
    const response = await driverService.deleteDriver(req.params.id);
    if (!response) {
      logger.error("Invalid ID while Deleteing driver.");
      return res.status(400).json({
        success: false,
        message: "Invalid driverID",
      });
    } else {
      logger.info("Deleing Driver was success.");
      return res.status(200).json({
        success: true,
        data: response,
        message: "Driver deleted Successfully",
      });
    }
  } catch (error) {
    logger.error("Error in DeleteDriver."+ error)
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const availableDrivers = async (req: Request, res: Response) => {
  try {
    const response = await driverService.availableDrivers();
    if (!response) {
      logger.error("No available driver.");
      return res.status(404).json({
        success: false,
        message: "Not Available Any Driver"
      });
    } else {
      logger.info("Available driver is found.");
      return res.status(200).json({
        success: true,
        data: response,
        message: "all available driver",
      });
    }
  } catch (error) {
    logger.error("Error in availableDriver."+ error)
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const imageUpload = async (req: Request, res: Response) => {
  try {
    const getPresignedUrl = async (client: S3Client) => {
      const fileName =
        Date.now().toString() + (Math.random() * 100000).toFixed(0);
      const fileUrl = `https://${AWS_S3.NAME}.s3.${AWS_S3.REGION}.amazonaws.com/${fileName}`;
      const command = new PutObjectCommand({
        Bucket: AWS_S3.NAME,
        Key: fileName,
      });
      const preSignedUrl = await getSignedUrl(client, command);
      return {
        fileUrl,
        preSignedUrl,
      };
    };
    const count = req.query.count ?? 1;
    const presignedUrlArray = [];
    for (let index = 0; index < +count; index++) {
      presignedUrlArray.push(getPresignedUrl(client));
    }
    const presignedUrlResult = await Promise.allSettled(presignedUrlArray);
    const uploadUrls = [];
    for (const result of presignedUrlResult) {
      if (result.status === "fulfilled") {
        uploadUrls.push(result.value);
      }
    }
    return res.status(200).json({
      success: true,
      data: uploadUrls,
      message: "preSignedUrl Generated...",
    });
  } catch (error) {
    logger.error("Error in imageUpload."+error)
    return res
      .status(500)
      .json({ success: false, message: "preSigned URL failed:" + error });
  }
};

export const addVehicleAndSaveImage = async (req: Request, res: Response) => {
  try {
    const { model, year, licensePlate, vehicleClass, driverId, imageUrls } =
      req.body;
    const vehicleExist = await vehicleService.findVehicle({ licensePlate });
    if (vehicleExist) {
      logger.error("Vehicle is already registered.");
      return res.status(409).json({
        success: false,
        message: "Already Registered Vehicle",
      });
    }
    // Add the vehicle
    const response = await vehicleService.addVehicle({
      model,
      year,
      licensePlate,
      vehicleClass,
      driverId,
      fare: 0
    });
    await response.save();
    const driver = await driverService.findDriver({ _id: driverId });
    if (!driver) {
      logger.error("Driver not found to add vehicle.");
      return res.status(404).json({
        success: false,
        message: "Driver not found"
      });
    }
    // Add each image URL to the driver's images array
    for (const imageUrl of imageUrls) {
      driver.images.push(imageUrl);
    }
    // Save the updated driver document
    await driver.save();
    return res.status(201).json({
      success: true,
      isReg: true,
      message: "Vehicle added successfully, and image URLs saved",
    });
  } catch (error) {
    logger.error("Error in addImage in DB."+error)
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while adding vehicle or saving image URLs: " +
        error,
    });
  }
};

export const bookingOTP = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    logger.error("Driver id is not given.");
    return res.status(400).json({
      success: false,
      message: "Driver ID is required",
    });
  }
  try {
    const updatedDigit = await driverService.updateBookingOTP(id);
    logger.info("Booking otp is generated.");
    return res.status(200).json({
      success: true,
      randomDigit: updatedDigit.digit,
    });
  } catch (error) {
    logger.error("Error in save randomDigit in DB."+error)
    return res.status(500).json({
      success: false,
      message: "Error in generating and saving random digit: " + error,
    });
  }
};

export const verifyBookingOTP = async (req: Request, res: Response) => {
  const { id, otp } = req.body;
  if (!id || !otp) {
    logger.error("DriverID or otp is not given.");
    return res.status(400).json({
      success: false,
      message: "Driver ID and OTP are required",
    });
  }
  try {
    const isValid = await driverService.verifyBookingOTP(id, otp);
    if (isValid) {
      logger.info("OTP verification is a success.");
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      logger.error("entered invalid OTP.");
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    logger.error("Error in verifying OTP: " + error);
    return res.status(500).json({
      success: false,
      message: "Error in verifying OTP: " + error,
    });
  }
};