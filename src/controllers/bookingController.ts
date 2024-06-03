import { Request, Response } from 'express';
import {viewBooking,viewBookingAll,viewBookingFilter,createBooking,updateBooking,deleteBooking,getRevenue,aggregateBookings} from '../services/bookingService';
import logger from '../utils/logger';
import mongoose from 'mongoose';

export const viewBookings = async (req:Request, res:Response)=> {
  try {
    const { id } = req.query as { id: string };
    const status = req.body.status || req.query.status;
    const validStatusValues = ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'];
    if(id || status){
     if(id){
       const response = await viewBooking(id);  
       if(!response){
          return res.status(404).json({ success: false, message: "No Booking Found"});
       }
       return res.status(200).json({success: true,data:response, message: "all booking here."});
     }
      const response = await viewBookingFilter({ status });
      if(!validStatusValues.includes(status)){
        return res.status(404).json({success:false,message:"Invalid Enter Status"})
      }
      if(response.length===0){
        return res.status(404).json({success:false,message:"No Booking found"})
      }
      return res.status(200).json({success:true,data:response,message:'Booking found based on status'})
    }
    else{
      const response = await viewBookingAll()
      return res.status(200).json({success:true,data:response,message:"all booking here."})
    }
  } catch (error) {
    logger.error('Error in getBooking controller'+error)
    return res.status(500).json({success:false,message:`Error in viewBooking:`+error})
  }
};

export const createBookings = async (req:Request, res:Response) => {
  try {
    const response = await createBooking(req.body);
    await response.save();
    return res.status(201).json({success:true,data:response,message:"Ride booking successfully."})
  } catch (error) {
    logger.error('Error in createBooking controller'+error)
    return res.status(500).json({success:false,message:`Error in createBooking:`+ error});
  }
};

export const updateBookings = async (req:Request, res:Response) => {
  try {
    const response = await updateBooking(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({success:true,data:response,message:"Booking updated successfully.."});
  } catch (error) {
    logger.error('Error in updateBooking controller'+error)
    return res.status(500).json({success:false,message:`Error in updateBooking:`+ error});
  }
};

export const deleteBookings = async (req:Request, res:Response) => {
  try {
    const response = await deleteBooking(req.params.id);
    if (!req.params.id ||!mongoose.Types.ObjectId.isValid || !response) {
      return res.status(404).json({success:false,message:"Enter valid Booking"});
    }
    return res.status(200).json({success:true,message:"Booking Cancel Suceesfully."});
  } catch (error) {
    logger.error('Error in deleteBooking controller'+error)
    return res.status(500).json({success:false,message:`Error in deleteBooking:`+ error});
  }
};

export const getRevenues = async (req:Request, res:Response) => {
    const response = await getRevenue();
    return res.status(200).json({success:true,data:response,message:"Generate total Revenue"});
};

export const totalBookings = async (req:Request, res:Response) => {
    const response = await aggregateBookings();
    return res.status(200).json({success:true,data:response,message:"Generate total Booking"});
  }