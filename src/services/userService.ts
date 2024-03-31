import { QueryOptions, RootQuerySelector, UpdateQuery } from "mongoose";
import CustomerSchema, { Customer } from "../models/customerModel";
import logger from "../utils/logger";

const viewCustomer = async () => {
  try {
    return await CustomerSchema.find();
  } catch (error) {
    logger.error(error);
  }
};

const viewCustomerById = async (query: string) => {
  try {
    return await CustomerSchema.findById(query);
  } catch (error) {
    logger.error(error);
  }
};

const deleteCustomer = async (query: string) => {
  try {
    return await CustomerSchema.findByIdAndDelete(query);
  } catch (error) {
    logger.error(error);
  }
};

const updateCustomer = async (
  id:string,
  query: UpdateQuery<Customer>,
) => {
  try {
    return await CustomerSchema.findByIdAndUpdate(id, query, {new: true});
  } catch (error) {
    logger.error(error);
  }
};

const findCustomer = async (query: RootQuerySelector<Customer>) => {
  try {
    return await CustomerSchema.findOne(query);
  } catch (error) {
    logger.error(error);
  }
};

const registerUser = async (query: RootQuerySelector<Customer>) => {
  try {
    return await CustomerSchema.create(query);
  } catch (error) {
    logger.error(error);
  }
};

// const updateSingle = async (
//   get: ,
//   set: ,
//   option:
// ) => {
//   try {
//     return await CustomerSchema.updateOne(get, set, option);
//   } catch (error) {
//     logger.error(error);
//   }
// };

export const customerService = {
  viewCustomer,
  viewCustomerById,
  deleteCustomer,
  updateCustomer,
  findCustomer,
  registerUser,
  //   updateSingle,
};
