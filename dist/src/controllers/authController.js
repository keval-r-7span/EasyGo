var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { customerService } from "../services/userService";
import { TWILIO } from "../helper/constants";
import twilio from "twilio";
import logger from "../utils/logger";
import jwtToken from "../validation/jwtToken";
const client = twilio(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, role } = req.body;
        const userExist = yield customerService.findCustomer({ phoneNumber });
        if (userExist) {
            throw new Error("User Already exist with phoneNumber");
        }
        if (role !== "admin") {
            const response = yield customerService.registeruserTemp({
                name,
                email: email.toLowerCase(),
                phoneNumber,
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
        return res.json({
            sucess: false,
            message: "Error occured at Sign-Up" + error,
        });
    }
});
const sendOtp = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
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
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const existUserTemp = yield customerService.findPhoneNumber({
                phoneNumber,
            });
            if (existUserTemp) {
                const newUser = yield customerService.registerUser({
                    name: existUserTemp.name,
                    email: existUserTemp.email,
                    phoneNumber: existUserTemp.phoneNumber,
                    role: existUserTemp.role,
                });
                yield (newUser === null || newUser === void 0 ? void 0 : newUser.save());
                yield customerService.removeTempUser(existUserTemp.id);
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
const sendLoginOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    const fourDigit = phoneNumber.substring(5, 10);
    let registeredUser = yield customerService.findCustomer({ phoneNumber });
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otp } = req.body;
    try {
        const response = yield client.verify.v2
            .services(TWILIO.SERVICE_SID)
            .verificationChecks.create({
            to: `+91${phoneNumber}`,
            code: otp,
        });
        if (response.status === "approved") {
            const existUser = yield customerService.findCustomer({ phoneNumber });
            if (!existUser) {
                return res.json({
                    success: false,
                    message: "Oops!! Sign-Up first",
                });
            }
            else {
                const token = jwtToken(existUser);
                existUser.token = token;
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
        logger.error(error);
        return res.json({
            sucess: false,
            message: "Error occured while verifying otp",
        });
    }
});
export { signUp, verifyOtp, sendLoginOtp, login };
