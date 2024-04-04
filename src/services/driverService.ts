import { RootQuerySelector, UpdateQuery } from "mongoose";
import  driverSchema, { driver } from '../models/driverModel';
import tempAuthSchema, {tempAuth} from "../models/tempAuthModal";
import logger from "../utils/logger";

// const findDriver = async (query: RootQuerySelector<driver>) => {
//   try {
//     return await driverSchema.findOne(query);
//   } catch (error) {
//     throw error;
//   }
// };

// const registerUser = async (query: RootQuerySelector<driver>) => {
//   try {
//     return await driverSchema.create(query);
//   } catch (error) {
//     throw error;
//   }
// };

// const updateDriver = async (id: string, query: UpdateQuery<driver>) => {
//   try {
//     return await driverSchema.findByIdAndUpdate(id, query);
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteDriver = async (query: string) => {
//   try {
//     return await driverSchema.findByIdAndDelete(query);
//   } catch (error) {
//     throw error;
//   }
// };

// const availableDrivers = async () => {
//   try {
//     return await driverSchema.find({ availability: 'available' }).select('name');
//   } catch (error) {
//     throw error;
//   }
// };

// const registeruserTemp = async (query: RootQuerySelector<driver>) => {
//   try {
//     return await tempAuthSchema.create(query);
//   } catch (error) {
//     logger.error(error);
//     throw error
//   }
// };

// const findPhoneNumber = async (query: RootQuerySelector<driver>) => {
//   try {
//     return await tempAuthSchema.findOne(query);
//   } catch (error) {
//     logger.error(error);
//     throw error
//   }
// };

// const removeTempUser = async (query: string) => {
//   try {
//     return await tempAuthSchema.findByIdAndDelete(query);
//   } catch (error) {
//     logger.error(error);
//     throw error
//   }
// };




// export const driverService =  {findDriver,registerUser,updateDriver,deleteDriver,availableDrivers, registeruserTemp, findPhoneNumber, removeTempUser}




const viewCustomer = async () => {
  try {
    return await driverSchema.find();
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const viewCustomerById = async (query: string) => {
  try {
    return await driverSchema.findById(query);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const deleteCustomer = async (query: string) => {
  try {
    return await driverSchema.findByIdAndDelete(query);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const updateCustomer = async (
  id:string,
  query: UpdateQuery<tempAuth>,
) => {
  try {
    return await driverSchema.findByIdAndUpdate(id, query, {new: true});
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const findCustomer = async (query: RootQuerySelector<tempAuth>) => {
  try {
    return await driverSchema.findOne(query);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const registerUser = async (query: RootQuerySelector<tempAuth>) => {
  try {
    return await driverSchema.create(query);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const registeruserTemp = async (query: RootQuerySelector<tempAuth>) => {
  try {
    return await tempAuthSchema.create(query);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const findPhoneNumber = async (query: RootQuerySelector<tempAuth>) => {
  try {
    return await tempAuthSchema.findOne(query);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const removeTempUser = async (query: string) => {
  try {
    return await tempAuthSchema.findByIdAndDelete(query);
  } catch (error) {
    logger.error(error)
    throw error
  }
};


export const driverService = {
  viewCustomer,
  viewCustomerById,
  deleteCustomer,
  updateCustomer,
  findCustomer,
  registerUser,
  registeruserTemp,
  findPhoneNumber,
  removeTempUser,
  // findloc
};
