import  {driverService}  from '../services/driverService';
import { vehicleService } from '../services/vehicleService';
import { Request, Response, NextFunction } from "express";
import logger from '../utils/logger';
import { AWS_S3 } from '../helper/constants';
import  s3  from '../configs/awsS3';
import AWS from 'aws-sdk'

export const getDriver = async (req: Request, res: Response) => {
  try {
    const response = await driverService.viewDriver();
    if(!response){
      return res.status(404).json({success:true,message:"No Any Driver Register."})
    }
    return res.status(200).json({
      sucess: true,
      data: response,
      message:"All Available Driver" });
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

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const { manufacturer, model, year, licensePlate, color, vehicleClass, driverId } = req.body;
    const vehicleExist = await vehicleService.findVehicle({ licensePlate });
    if (vehicleExist) {
      return res.status(500).json({
        success: false,
        message: "Already Register Vehicle ",
      });
    }
    const response = await vehicleService.addVehicle({
      manufacturer, model, year, licensePlate, color, vehicleClass, driverId,
      fare: 0,
      save: function (): unknown {
        throw new Error('Function not implemented.');
      }
    });
    await response.save();
    return res.status(201).json({
      success: true,
      data:response,
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
      data:response,
      message: "vehicle details updated Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

export const updateDriver = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const response = await driverService.updateDriver(req.params.id, {
      name,
      email,
      role,
    });
    return res.status(200).json({
      success: true,
      data:response,
      message: "Driver updated Successfully"
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  try {
    const response = await driverService.deleteDriver(req.params.id);
    if(!response){
      return res.status(400).json({
        success: false,
        message: "Invalid driverID"
      })
    }
    return res.status(200).json({
      success: true,
      data:response,
      message: "Driver deleted Successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const availableDrivers = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const response = await driverService.availableDrivers();
    if (!response){ return res.status(404).json({success:false,message:"Not Available Any Driver"})}
    return res.status(200).json({
      success: true,
      data:response,
      message: "all available driver",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

export const imgUpload = async (req: Request, res: Response) => {
  try {
      const files = req.files as Express.Multer.File[];
    if (!req.files || req.files.length === 0) {
      return res.status(404).json({success:false,message:'No files uploaded'});
    }
    files.map((file) => {
      const params:AWS.S3.PutObjectRequest = {
          Bucket: AWS_S3.NAME as string,
          Key: file.originalname,
          Body: file.buffer,
          ContentType: "image/jpeg/jpg"
      };
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to upload file.' });
      }
  });
});
    return res.status(200).json({ success: true, message: "Files uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error uploading files to S3" });
  }
};
