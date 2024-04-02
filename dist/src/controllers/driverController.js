var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { driverService } from '../services/driverService';
import { vehicleService } from '../services/vehicleService';
export const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, vehicleDetails, role } = req.body;
        const userExist = yield driverService.findDriver({ phoneNumber });
        if (userExist) {
            throw new Error("User Already exist with same phoneNumber");
        }
        if (role !== "driver" && role == "") {
            return res.status(400).json({
                success: false,
                message: "check your role",
            });
        }
        const response = yield driverService.registerUser({
            name,
            email: email.toLowerCase(),
            phoneNumber,
            vehicleDetails,
            role,
        });
        yield response.save();
        return res.status(200).json({
            success: true,
            data: response,
            message: "User created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in signUp " + error,
        });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(500).json({
                success: false,
                message: "Please enter proper info! ",
            });
        }
        const registeredUser = yield driverService.findDriver({ phoneNumber });
        if (!registeredUser) {
            return res.json({
                success: false,
                message: "Please Register First",
            });
        }
        else {
            return res.json({
                success: true,
                message: "User is successfully logged in",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in login " + error,
        });
    }
});
export const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, phoneNumber, availability, vehicleDetails } = req.body;
        const response = yield driverService.updateDriver(id, { name, phoneNumber, availability, vehicleDetails });
        return res.status(200).json({
            success: true,
            data: response,
            message: "driver details updated Successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot find ID to update : " + error,
        });
    }
});
export const deleteDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield driverService.deleteDriver(id);
        return res.status(200).json({
            success: true,
            data: response,
            message: "Driver deleted successfully!",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting driver " + error,
        });
    }
});
export const availableDrivers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableDrivers = yield driverService.availableDrivers();
        res.status(200).json({
            success: true,
            drivers: availableDrivers,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch available drivers",
        });
    }
});
export const addVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { manufacturer, model, year, licensePlate, color, vehicleClass, driverId } = req.body;
        const vehicleExist = yield vehicleService.findVehicle({ licensePlate });
        if (vehicleExist) {
            throw new Error("vehicle Already exist with same licensePlate");
        }
        const response = yield vehicleService.addVehicle({
            manufacturer, model, year, licensePlate, color, vehicleClass, driverId,
            fare: 0,
            save: function () {
                throw new Error('Function not implemented.');
            }
        });
        yield response.save();
        return res.status(200).json({
            success: true,
            data: response,
            message: "vehicle added successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while addind vehicle " + error,
        });
    }
});
export const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { manufacturer, model, year, licensePlate, color, vehicleClass } = req.body;
        const response = yield vehicleService.updateVehicleDetails(id, { manufacturer, model, year, licensePlate, color, vehicleClass });
        return res.status(200).json({
            success: true,
            data: response,
            message: "vehicle details updated Successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot find ID to update vehicle data : " + error,
        });
    }
});
