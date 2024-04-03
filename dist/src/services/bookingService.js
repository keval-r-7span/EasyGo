var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BookingSchema from '../models/bookingModel';
import logger from '../utils/logger';
const viewBookingAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield BookingSchema.find();
        //   .populate("customer")
        //   .populate("driver")
    }
    catch (error) {
        logger.error(error);
    }
});
const viewBooking = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield BookingSchema.findById(query)
            .sort({ createdAt: -1 });
    }
    catch (error) {
        logger.error(error);
    }
});
const viewBookingFilter = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield BookingSchema.find(query)
            .sort({ createdAt: -1 });
    }
    catch (error) {
        logger.error(error);
    }
});
const createBooking = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield BookingSchema.create(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const updateBooking = (id, query, option) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield BookingSchema.findByIdAndUpdate(id, query, option);
    }
    catch (error) {
        logger.error(error);
    }
});
const deleteBooking = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield BookingSchema.findByIdAndDelete(query);
    }
    catch (error) {
        logger.error(error);
    }
});
const getRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monthlyRevenue = yield BookingSchema.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$pickupTime" },
                        month: { $month: "$pickupTime" },
                    },
                    totalRevenue: { $sum: "$fare" },
                },
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 },
            },
        ]);
        return monthlyRevenue;
    }
    catch (error) {
        logger.error(error);
    }
});
const aggregateBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield BookingSchema.aggregate([
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$createdAt" },
                        week: { $week: "$createdAt" },
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    totalBookings: { $sum: 1 },
                },
            },
        ]);
        return result;
    }
    catch (error) {
        logger.error(error);
    }
});
export const bookingService = { createBooking, viewBookingAll, viewBookingFilter, viewBooking, updateBooking, deleteBooking, getRevenue, aggregateBookings };
