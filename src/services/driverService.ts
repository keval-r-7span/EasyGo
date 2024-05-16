import { RootQuerySelector, UpdateQuery } from "mongoose";
import driverSchema, {driver} from "../models/driverModel";

const viewDriver = async () => {
  return await driverSchema.find();
};

const viewDriverById = async (query: string) => {
  return await driverSchema.findById(query);
};

const deleteDriver = async (query: string) => {
  return await driverSchema.findByIdAndDelete(query);
};

const updateDriver = async (id: string, query: UpdateQuery<driver>) => {
  return await driverSchema.findByIdAndUpdate(id, query, { new: true });
};

const findDriver = async (query: RootQuerySelector<driver>) => {
  return await driverSchema.findOne(query);
};

const registerUser = async (query: RootQuerySelector<driver>) => {
  return await driverSchema.create(query);
};

const registeruserTemp = async (query: RootQuerySelector<driver>) => {
  return await driverSchema.create(query);
};

const findPhoneNumber = async (query: RootQuerySelector<driver>) => {
  return await driverSchema.findOne(query);
};

const removeTempUser = async (query: string) => {
  return await driverSchema.findByIdAndDelete(query);
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
  registerUser,
  registeruserTemp,
  findPhoneNumber,
  removeTempUser,
  availableDrivers,
};