import { QueryOptions, RootQuerySelector, UpdateQuery}from 'mongoose';
import BookingSchema,{Booking} from '../models/bookingModel';


const viewBookingAll = async ()=> {
     return await BookingSchema.find()
    //   .populate("customer")
    //   .populate("driver")
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const viewBooking = async (query:string) => {
  try {
    return await BookingSchema.findById(id)
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const viewBookingFilter = async (query:RootQuerySelector<Booking>) => {
  try {
    return await BookingSchema.find(query)
      .sort({ createdAt: -1 })
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const createBooking = async (id:string) => {
  try {
    return await BookingSchema.create(id);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const updateBooking = async (id:string, query:UpdateQuery<Booking>, option:QueryOptions<Booking>) => {
  try {
    return await BookingSchema.findByIdAndUpdate(id, query, option);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const deleteBooking = async (query:string)=> {
  try {
    return await BookingSchema.findByIdAndDelete(id);
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const getRevenue = async () => {
  try {
    const monthlyRevenue = await BookingSchema.aggregate([
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
  } catch (error) {
    logger.error(error)
    throw error
  }
};

const aggregateBookings = async () => {
  try {
    const result = await BookingSchema.aggregate([
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
  } catch (error) {
    logger.error(error)
    throw error
  }
};

export const bookingService =  {createBooking,viewBookingAll,viewBookingFilter,viewBooking,updateBooking,deleteBooking,getRevenue,aggregateBookings}
