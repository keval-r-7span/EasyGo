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
export const driverService = { findDriver, registerUser, updateDriver, deleteDriver, availableDrivers };
