import { RootQuerySelector, UpdateQuery } from "mongoose";
import  driverSchema, { driver } from '../models/driverModel';

export const findDriver = async (query: RootQuerySelector<driver>) => { 
export const findDriver = async (query: RootQuerySelector<driver>) => { 
  try {
    return await driverSchema.findOne(query);
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (query: RootQuerySelector<driver>) => {
export const registerUser = async (query: RootQuerySelector<driver>) => {
  try {
    return await driverSchema.create(query);
  } catch (error) {
    throw error;
  }
};

export const updateDriver = async (id: string, query: UpdateQuery<driver>) => {
export const updateDriver = async (id: string, query: UpdateQuery<driver>) => {
  try {
    return await driverSchema.findByIdAndUpdate(id, query);
  } catch (error) {
    throw error;
  }
};

export const deleteDriver = async (query: string) => {
export const deleteDriver = async (query: string) => {
  try {
    return await driverSchema.findByIdAndDelete(query);
  } catch (error) {
    throw error;
  }
};

export const availableDrivers = async () => {
export const availableDrivers = async () => {
  try {
    return await driverSchema.find({ availability: 'available' }).select('name');
  } catch (error) {
    throw error;
  }
};

const registeruserTemp = async (query: RootQuerySelector<driver>) => {
  try {
    return await tempAuthSchema.create(query);
  } catch (error) {
    logger.error(error);
    throw error
  }
};

const findPhoneNumber = async (query: RootQuerySelector<driver>) => {
  try {
    return await tempAuthSchema.findOne(query);
  } catch (error) {
    logger.error(error);
    throw error
  }
};

const removeTempUser = async (query: string) => {
  try {
    return await tempAuthSchema.findByIdAndDelete(query);
  } catch (error) {
    logger.error(error);
    throw error
  }
};


export const driverService =  {findDriver,registerUser,updateDriver,deleteDriver,availableDrivers, registeruserTemp, findPhoneNumber, removeTempUser}
