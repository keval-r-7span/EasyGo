var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { driverService } from "../services/driverService";
import { vehicleService } from "../services/vehicleService";
import { TWILIO } from "../helper/constants";
import twilio from "twilio";
import logger from "../utils/logger";
import jwtToken from "../validation/jwtToken";
const client = twilio(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);
export const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, vehicleDetails, role } = req.body;
        const userExist = yield driverService.findDriver({ phoneNumber });
        if (userExist) {
            throw new Error("User Already exist with same phoneNumber");
        }
        if (role !== "driver" && role == "") {
            const response = yield driverService.registerUser({
                name,
                email: email.toLowerCase(),
                phoneNumber,
                vehicleDetails,
                role,
            });
            if (!response) {
                return res.json({
                    success: false,
                    message: "Invalid Data",
                });
            }
            const otpResponse = yield sendOtp(phoneNumber);
            if (!otpResponse.success) {
                throw new Error("Failed to send OTP");
            }
            yield response.save();
            return res.json({
                success: true,
                message: "OTP sent Please verify within 10 minutes",
            });
        }
        else {
            return res.json({
                sucess: false,
                message: "Role Should not be selected as Admin",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in signUp " + error,
        });
    }
});
export const sendOtp = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fourDigit = phoneNumber.substring(5, 9);
        const response = yield client.verify.v2
            .services(TWILIO.SERVICE_SID)
            .verifications.create({
            to: `+91${phoneNumber}`,
            channel: "sms",
        });
        return {
            success: true,
            data: response,
            message: `OTP successfully sent to mobile Number ending with ${fourDigit}`,
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Error occurred while sending OTP",
        };
    }
});
export const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber && !otp) {
        return res.json({
            success: false,
            message: "Please Enter phone and otp",
        });
    }
    try {
        const response = yield client.verify.v2
            .services(TWILIO.SERVICE_SID)
            .verificationChecks.create({
            to: `+91${phoneNumber}`,
            code: otp,
        });
        if (response.status === "approved") {
            const existUserTemp = yield driverService.findPhoneNumber({
                phoneNumber,
            });
            if (existUserTemp) {
                const newUser = yield driverService.registerUser({
                    name: existUserTemp.name,
                    email: existUserTemp.email,
                    phoneNumber: existUserTemp.phoneNumber,
                    role: existUserTemp.role,
                });
                yield (newUser === null || newUser === void 0 ? void 0 : newUser.save());
                yield driverService.removeTempUser(existUserTemp.id);
            }
        }
        return res.json({
            success: true,
            message: "Successfully Verified and Registered ",
        });
    }
    catch (error) {
        return res.json({
            sucess: false,
            message: "Error occured while verifying otp" + error,
        });
    }
});
export const sendLoginOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    const fourDigit = phoneNumber.substring(5, 10);
    let registeredUser = yield driverService.findDriver({ phoneNumber });
    if (!registeredUser) {
        return res.json({
            sucess: false,
            message: `No user exist with such ${phoneNumber} please Sign-Up first!!`,
        });
    }
    else {
        try {
            const response = yield client.verify.v2
                .services(TWILIO.SERVICE_SID)
                .verifications.create({
                to: `+91${phoneNumber}`,
                channel: "sms",
            });
            return res.status(200).json({
                sucess: true,
                message: `OTP successfully sent to mobile Number ending with ${fourDigit}`,
            });
        }
        catch (error) {
            logger.error(error);
            return res.json({
                sucess: false,
                data: "Error occured at sending OTP",
            });
        }
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otp } = req.body;
    try {
        const response = yield client.verify.v2
            .services(TWILIO.SERVICE_SID)
            .verificationChecks.create({
            to: `+91${phoneNumber}`,
            code: otp,
        });
        if (response.status === "approved") {
            const registeredUser = yield driverService.findDriver({ phoneNumber });
            if (!registeredUser) {
                return res.json({
                    success: false,
                    message: "Oops!! Sign-Up first",
                });
            }
            else {
                const token = jwtToken(registeredUser);
                registeredUser.token = token;
                return res
                    .cookie("token", token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true })
                    .json({
                    success: true,
                    message: "User Logged in successfully",
                });
            }
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
        const response = yield driverService.updateDriver(id, {
            name,
            phoneNumber,
            availability,
            vehicleDetails,
        });
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
        const { manufacturer, model, year, licensePlate, color, vehicleClass, driverId, } = req.body;
        const vehicleExist = yield vehicleService.findVehicle({ licensePlate });
        if (vehicleExist) {
            throw new Error("vehicle Already exist with same licensePlate");
        }
        const response = yield vehicleService.addVehicle({
            manufacturer,
            model,
            year,
            licensePlate,
            color,
            vehicleClass,
            driverId,
            fare: 0,
            save: function () {
                throw new Error("Function not implemented.");
            },
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
        const response = yield vehicleService.updateVehicleDetails(id, {
            manufacturer,
            model,
            year,
            licensePlate,
            color,
            vehicleClass,
        });
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
export const getDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield driverService.viewDriver();
        return res.status(200).json({
            sucess: true,
            data: response
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            sucess: false,
            message: "Error in GetDriver",
        });
    }
});
export const getDriverByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield driverService.viewDriverById(req.params.id);
        return res.status(200).json({
            sucess: true,
            data: response,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            sucess: false,
            message: "Error in GetDriver ID",
        });
    }
});
