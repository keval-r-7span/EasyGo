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
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield customerService.viewCustomer();
        return res.status(200).json({
            sucess: true,
            data: response
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            sucess: false,
            message: "Error in GetCustomer",
        });
    }
});
const getCustomerByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield customerService.viewCustomerById(req.params.id);
        return res.status(200).json({
            sucess: true,
            data: response,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            sucess: false,
            message: "Error in GetCustomer ID",
        });
    }
});
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, role } = req.body;
        const response = yield customerService.updateCustomer(req.params.id, {
            name,
            email,
            role,
        });
        return res.status(200).json({
            sucess: true,
            data: response,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            sucess: false,
            message: "ERROR in Update Customer",
        });
    }
});
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield customerService.deleteCustomer(req.params.id);
        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID"
            });
        }
        return res.status(200).json({
            sucess: true,
            data: response,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "ERROR in DeleteCustomer",
        });
    }
});
export { getCustomer, getCustomerByID, updateCustomer, deleteCustomer };
