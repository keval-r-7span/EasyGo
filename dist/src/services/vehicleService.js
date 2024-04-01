var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import vehicleDetails from '../models/vehicleDetails';
export const findVehicle = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield vehicleDetails.findOne(query);
    }
    catch (error) {
        throw error;
    }
});
export const addVehicle = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield vehicleDetails.create(query);
    }
    catch (error) {
        throw error;
    }
});
export const updateVehicleDetails = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield vehicleDetails.findByIdAndUpdate(id, query);
    }
    catch (error) {
        throw error;
    }
});
export const vehicleService = { findVehicle, addVehicle, updateVehicleDetails };
