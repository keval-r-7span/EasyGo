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
export const findDriver = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findOne(query);
    }
    catch (error) {
        throw error;
    }
});
export const registerUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.create(query);
    }
    catch (error) {
        throw error;
    }
});
export const updateDriver = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findByIdAndUpdate(id, query);
    }
    catch (error) {
        throw error;
    }
});
export const deleteDriver = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findByIdAndDelete(query);
    }
    catch (error) {
        throw error;
    }
});
export const availableDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.find({ availability: 'available' }).select('name');
    }
    catch (error) {
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
export const removeTempUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.findByIdAndDelete(query);
    }
    catch (error) {
        logger.error(error);
    }
});
export const viewDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.find();
    }
    catch (error) {
        logger.error(error);
    }
});
export const viewDriverById = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield driverSchema.findById(query);
    }
    catch (error) {
        logger.error(error);
    }
});
export const driverService = { findDriver, registerUser, updateDriver, deleteDriver, availableDrivers, findPhoneNumber, removeTempUser, viewDriver, viewDriverById };
