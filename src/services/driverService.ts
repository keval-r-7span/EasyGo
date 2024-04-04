import { RootQuerySelector, UpdateQuery } from "mongoose";
import  driverSchema, { driver } from '../models/driverModel';
import tempAuthSchema, {tempAuth} from "../models/tempAuthModal";
import logger from "../utils/logger";

export const findDriver = async (query: RootQuerySelector<driver>) => { 
  try {
    return await driverSchema.findOne(query);
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (query: RootQuerySelector<driver>) => {
  try {
    return await driverSchema.create(query);
  } catch (error) {
    throw error;
  }
};

export const updateDriver = async (id: string, query: UpdateQuery<driver>) => {
  try {
    return await driverSchema.findByIdAndUpdate(id, query);
  } catch (error) {
    throw error;
  }
};

export const deleteDriver = async (query: string) => {
  try {
    return await driverSchema.findByIdAndDelete(query);
  } catch (error) {
    throw error;
  }
};

export const availableDrivers = async () => {
  try {
    return await driverSchema.find({ availability: 'available' }).select('name');
  } catch (error) {
    throw error;
  }
};

export const findPhoneNumber = async (query: RootQuerySelector<driver>) => {
  try {
    return await tempAuthSchema.findOne(query);
  } catch (error) {
    logger.error(error);
  }
};

export const removeTempUser = async (query: string) => {
  try {
    return await tempAuthSchema.findByIdAndDelete(query);
  } catch (error) {
    logger.error(error);
  }
};

export const viewDriver = async () => {
  try {
    return await driverSchema.find();
  } catch (error) {
    logger.error(error);
  }
};

export const viewDriverById = async (query: string) => {
  try {
    return await driverSchema.findById(query);
  } catch (error) {
    logger.error(error);
  }
};


export const driverService =  {findDriver,registerUser,updateDriver,deleteDriver,availableDrivers,findPhoneNumber,removeTempUser,viewDriver,viewDriverById}