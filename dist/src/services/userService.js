var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CustomerSchema from "../models/customerModel";
import tempAuthSchema from "../models/tempAuthModal";
import logger from "../utils/logger";
const viewCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield CustomerSchema.find();
    }
    catch (error) {
        logger.error(error);
    }
});
const viewCustomerById = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield CustomerSchema.findById(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const deleteCustomer = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield CustomerSchema.findByIdAndDelete(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const updateCustomer = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield CustomerSchema.findByIdAndUpdate(id, query, { new: true });
    }
    catch (error) {
        logger.error(error);
    }
});
const findCustomer = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield CustomerSchema.findOne(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const registerUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield CustomerSchema.create(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const registeruserTemp = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.create(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const findPhoneNumber = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.findOne(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const removeTempUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tempAuthSchema.findByIdAndDelete(query);
    }
    catch (error) {
        logger.error(error);
    }
});
export const customerService = {
    viewCustomer,
    viewCustomerById,
    deleteCustomer,
    updateCustomer,
    findCustomer,
    registerUser,
    registeruserTemp,
    findPhoneNumber,
    removeTempUser
};
