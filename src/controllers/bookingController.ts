import { Request,Response } from 'express';
import { bookingService } from '../services/bookingService';

const viewBooking = async (req:Request, res:Response)=> {
  try {
    const response = await bookingService.viewBookingAll()
    if (!response) {
     return res.status(404).json({success:false,message:"No Booking Available"})
    }
    return res.status(200).json({success:true,data:response,message:"all booking here."})
  } catch (error) {
    return res.status(500).json({success:false,message:error})
  }
};

const viewBookingById = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.viewBooking(req.params.id);
    if (!response) {
      return res.status(404).json({success:false,message:"No Booking Available"})
    }
    return res.status(200).json({success:true,data:response})
  } catch (error) {
    return res.status(500).json({success:true,message:error})
  }
};

const bookingStatus = async (req:Request, res:Response) => {
  try {
    const status = req.body.status || req.query.status;
    if(!status){
      return res.status(404).json({success:false,message:"enter status"})
    }
    const response = await bookingService.viewBookingFilter({ status });
    if(!response){
      return res.status(404).json({success:false,message:"No Booking Available"})
    }
    return res.status(200).json({success:true,data:response,message:"all booking here.."})
  } catch (error) {
    return res.status(500).json({success:true,message:error})
  }
};

const createBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.createBooking(req.body);
    if(!response){
      return res.status(404).json({success:false,message:'Enter Valid Field'})
    }
    await response.save();
    // mailForBooking(response);     //send mail after booking success
    return res.status(200).json({success:true,data:response,message:"Ride booking successfully."})
  } catch (error) {
    return res.status(500).json({success:false,message:error});
  }
};

const updateBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.updateBooking(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({success:false,message:"Enter Valid Booking ID or Value"});
    }
    return res.status(200).json({success:true,data:response,message:"Booking updated successfully.."});
  } catch (error) {
    return res.status(500).json({success:false,message:error});
  }
};

const deleteBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.deleteBooking(req.params.id);
    if (!response) {
      return res.status(404).json({success:false,message:"Enter valid Booking"});
    }
    return res.status(200).json({success:true,data:response,message:"Booking Cancel Suceesfully."});
  } catch (error) {
    return res.status(500).json({success:false,message:error});
  }
};


const getRevenue = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.getRevenue();
    if (!response) {
      return res.status(404).json({success:false,message:"No Any Revenue Found "});
    }
    return res.status(200).json({success:true,data:response,message:"Generate total Revenue"});
  } catch (error) {
    return res.status(500).json({success:false,message:error});
  }
};

const totalBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.aggregateBookings();
    if (!response) {
      return res.status(404).json({success:false,message:"No Any Booking Found "});
    }
    return res.status(200).json({success:true,data:response,message:"Generate total Booking"});
  } catch (error) {
    return res.status(500).json({success:false,message:error});
  }
};


export {viewBooking,createBooking,updateBooking,deleteBooking,getRevenue,totalBooking,bookingStatus,viewBookingById}
