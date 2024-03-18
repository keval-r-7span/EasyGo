const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    pickupLocation: {
      type: String,
    },
    dropoffLocation: {
      type: String,
    },
    pickupTime: {
      type: Date,
    },
    dropoffTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default:"pending"
    },
    fare: {
      type: Number,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default:"pending"
    },
    rating: {
      type: Number,
    },
    comments: {
      type: String,
      default:"Good Experience"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
