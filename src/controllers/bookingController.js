const logger = require("../helper/logger");
const { trueResponse, falseResponse } = require("../configs/responseMes");
const mailForBooking = require("../utils/sendMail");
const bookingService = require("../services/bookingService");
const bookingJoiSchema = require("../validation/bookingValidation");

const viewBooking = async (req, res) => {
  try {
    const response = await bookingService.viewBookingAll();
    if (!response) {
      return falseResponse(res, "NOT FOUND USER");
    }
    return trueResponse(res, response);
  } catch (error) {
    return falseResponse(res, error);
  }
};

const viewBookingById = async (req, res) => {
  try {
    const response = await bookingService.viewBooking(req.params.id);
    if (!response) {
      return falseResponse(res, "NOT FOUND USER");
    }
    return trueResponse(res, response);
  } catch (error) {
    return falseResponse(res, error);
  }
};

const BookingStatus = async (req, res) => {
  try {
    const status = req.body.status || req.query.status;
    const response = await bookingService.viewBookingFilter({ status });
    return trueResponse(res, response);
  } catch (error) {
    return falseResponse(res, error);
  }
};

const createBooking = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    mailForBooking(response);
    await response.save();
    return trueResponse(res, response);
  } catch (error) {
    return falseResponse(res, error);
  }
};

const updateBooking = async (req, res) => {
  try {
    const response = await bookingService.updateBooking(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!response) {
      return falseResponse(res, "NOT FOUND USER");
    }
    return trueResponse(res, response);
  } catch (error) {
    return falseResponse(res, error);
  }
};

const cancelBooking = async (req, res) => {
  try {
    const response = await bookingService.cancelBooking(req.params.id);
    if (!response) {
      return falseResponse(res, "NOT FOUND USER");
    }
    return trueResponse(res, response);
  } catch (error) {
    return falseResponse(res, error);
  }
};

const changeRideStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ridebooking = await bookingService.rideComplete(id);
    if (!ridebooking) {
      return falseResponse(res, "NOT FOUND");
    }
    ridebooking.status = "completed";
    await ridebooking.save();
    return trueResponse(res, ridebooking);
  } catch (error) {
    return falseResponse(res, error);
  }
};

const paymentStatus = async (req, res) => {
  try {
    const ridebooking = await bookingService.rideComplete(req.params.id);
    if (!ridebooking) {
      return falseResponse(res, "NOT FOUND");
    }
    ridebooking.payment_status = "completed";
    await ridebooking.save();
    return trueResponse(res, ridebooking);
  } catch (error) {
    return falseResponse(res, error);
  }
};

module.exports = {
  viewBooking,
  viewBookingById,
  createBooking,
  cancelBooking,
  changeRideStatus,
  updateBooking,
  BookingStatus,
  paymentStatus,
};
