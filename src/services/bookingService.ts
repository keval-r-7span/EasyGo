import { QueryOptions, RootQuerySelector, UpdateQuery}from 'mongoose';
import BookingSchema,{Booking} from '../models/bookingModel';


export const viewBookingAll = async ()=> {
  return await BookingSchema.find()
};

export const viewBooking = async (id:string) => {
    return await BookingSchema.findById(id)
};

export const viewBookingFilter = async (query:RootQuerySelector<Booking>) => {
  return await BookingSchema.find(query)
  .sort({ createdAt: -1 })
};

export const createBooking = async (id:string) => {
  return await BookingSchema.create(id);
};

export const updateBooking = async (id:string, query:UpdateQuery<Booking>, option:QueryOptions<Booking>) => {
  return await BookingSchema.findByIdAndUpdate(id, query, option);
};

export const deleteBooking = async (id:string)=> {
  return await BookingSchema.findByIdAndDelete(id);
};

export const getRevenue = async () => {
    const result = await BookingSchema.aggregate([
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
    return result;
};

export const aggregateBookings = async () => {
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
};

export const findUserIDBooking = async(query: {customer: string}) => {
  return await BookingSchema.findOne(query)
}


