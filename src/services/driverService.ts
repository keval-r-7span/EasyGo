import { RootQuerySelector, UpdateQuery } from "mongoose";
import driverSchema from "../models/driverModel";
import tempAuthSchema, { tempAuth } from "../models/tempAuthModal";
import { vehicleService } from "../services/vehicleService";

const viewDriver = async () => {
  return await driverSchema.find();
};

// const viewDriverById = async (query: string) => {
//   return await driverSchema.findById(query);
// };

const viewDriverById = async (driverId: string) => {
  try {
    const driverData = await driverSchema.findById(driverId);
    if (!driverData) {
      return null;
    }
    const vehiclesData = await vehicleService.findVehicle({ driverId });
    return { driver: driverData, vehicles: vehiclesData };
  } catch (error) {
    throw error;
  }
};

const deleteDriver = async (query: string) => {
  return await driverSchema.findByIdAndDelete(query);
};

const updateDriver = async (id: string, query: UpdateQuery<tempAuth>) => {
  return await driverSchema.findByIdAndUpdate(id, query, { new: true });
};

const findDriver = async (query: RootQuerySelector<tempAuth>) => {
  return await driverSchema.findOne(query);
};

const registerDriver = async (query: RootQuerySelector<tempAuth>) => {
  return await driverSchema.create(query);
};

const registerDriverTemp = async (query: RootQuerySelector<tempAuth>) => {
  return await tempAuthSchema.create(query);
};

const findPhoneNumber = async (query: RootQuerySelector<tempAuth>) => {
  return await tempAuthSchema.findOne(query);
};

const removeTempDriver = async (query: string) => {
  return await tempAuthSchema.findByIdAndDelete(query);
};

const availableDrivers = async () => {
  return await driverSchema
    .find({ availability: true });
};

export const driverService = {
  viewDriver,
  viewDriverById,
  deleteDriver,
  updateDriver,
  findDriver,
  registerDriver,
  registerDriverTemp,
  findPhoneNumber,
  removeTempDriver,
  availableDrivers,
};
