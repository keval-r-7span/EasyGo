var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import driverSchema from '../models/driverModel';
import tempAuthSchema from "../models/tempAuthModal";
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
const viewCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.find();
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const viewCustomerById = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findById(query);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const deleteCustomer = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findByIdAndDelete(query);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const updateCustomer = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findByIdAndUpdate(id, query, { new: true });
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const findCustomer = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findOne(query);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const registerUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.create(query);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const registeruserTemp = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.create(query);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const findPhoneNumber = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.findOne(query);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
const removeTempUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.findByIdAndDelete(query);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
export const findPhoneNumber = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.findOne(query);
    }
    catch (error) {
        logger.error(error);
    }
});
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
