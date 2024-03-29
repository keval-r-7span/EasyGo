import { RootQuerySelector, UpdateQuery } from "mongoose";
import  driverSchema, { driver } from '../models/driverModel';

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


export const driverService =  {findDriver,registerUser,updateDriver,deleteDriver,availableDrivers}