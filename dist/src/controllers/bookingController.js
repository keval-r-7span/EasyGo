var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bookingService } from '../services/bookingService';
const viewBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.viewBookingAll();
        if (!response) {
            return res.json({ sucess: false, data: "No Booking Available" });
        }
        return res.status(200).json({ sucess: true, data: response });
    }
    catch (error) {
        return res.json({ sucess: false, data: error });
    }
});
const viewBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.viewBooking(req.params.id);
        if (!response) {
            return res.json({ sucess: false, data: "No Booking Available" });
        }
        return res.status(200).json({ sucess: true, data: response });
    }
    catch (error) {
        return res.status(200).json({ sucess: true, message: error });
    }
});
const bookingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.body.status || req.query.status;
        const response = yield bookingService.viewBookingFilter({ status });
        if (!response) {
            return res.status(200).json({ sucess: true, message: "No Data Found." });
        }
        return res.status(200).json({ sucess: true, data: response });
    }
    catch (error) {
        return res.status(200).json({ sucess: true, message: error });
    }
});
const rideStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.updateBooking(req.params.id, {
            status: req.body.status,
        }, { new: true });
        if (!response) {
            return res.status(200).json({ sucess: false, message: "Enter Valid Booking ID or Value" });
        }
        return res.status(200).json({ sucess: true, data: response, message: "Sucessfully Updated status" });
    }
    catch (error) {
        return res.status(200).json({ sucess: false, message: error });
    }
});
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.createBooking(req.body);
        if (!response) {
            return res.status(400).json({ sucess: false, message: 'Enter Valid Field' });
        }
        yield response.save();
        // mailForBooking(response);     //send mail after booking sucess
        return res.status(200).json({ sucess: true, data: response });
    }
    catch (error) {
        return res.status(200).json({ sucess: false, message: error });
    }
});
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.updateBooking(req.params.id, {
            $set: req.body,
        }, { new: true });
        if (!response) {
            return res.status(200).json({ sucess: false, message: "Enter Valid Booking ID or Value" });
        }
        return res.status(200).json({ sucess: true, data: response, message: "Sucessfully Updated" });
    }
    catch (error) {
        return res.status(200).json({ sucess: false, message: error });
    }
});
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.updateBooking(req.params.id, {
            status: 'cancelled'
        }, { new: true });
        if (!response) {
            return res.status(200).json({ sucess: false, message: "Enter valid Booking" });
        }
        return res.status(200).json({ sucess: true, data: response, message: "Booking Cancel Suceesfully." });
    }
    catch (error) {
        return res.status(404).json({ sucess: false, message: error });
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.getRevenue();
        if (!response) {
            return res.status(200).json({ sucess: false, message: "No Any Revenue Found " });
        }
        return res.status(200).json({ sucess: true, data: response, message: "Generate total Revenue" });
    }
    catch (error) {
        return res.status(404).json({ sucess: false, message: error });
    }
});
const totalBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService.aggregateBookings();
        if (!response) {
            return res.status(200).json({ sucess: false, message: "No Any Booking Found " });
        }
        return res.status(200).json({ sucess: true, data: response, message: "Generate total Booking" });
    }
    catch (error) {
        return res.status(404).json({ sucess: false, message: error });
    }
});
export { viewBooking, createBooking, updateBooking, cancelBooking, getRevenue, totalBooking, bookingStatus, viewBookingById, rideStatus };
