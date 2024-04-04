import { Request,Response } from 'express';
import { bookingService } from '../services/bookingService';

const viewBooking = async (req:Request, res:Response)=> {
  try {
    const response = await bookingService.viewBookingAll()
    if (!response) {
     return res.status(404).json({success:false,data:"No Booking Available"})
    }
    return res.status(200).json({success:true,data:response})
  } catch (error) {
    return res.status(500).json({success:false,data:error})
  }
};

const viewBookingById = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.viewBooking(req.params.id);
    if (!response) {
      return res.status(404).json({success:false,data:"No Booking Available"})
    }
    return res.status(200).json({success:true,data:response})
  } catch (error) {
    return res.status(500).json({success:true,message:error})
  }
};

const bookingStatus = async (req:Request, res:Response) => {
  try {
    const status = req.body.status || req.query.status;
    const response = await bookingService.viewBookingFilter({ status });
    if(!response){
      return res.status(404).json({success:true,message:"No Data Found."})
    }
    return res.status(200).json({success:true,data:response})
  } catch (error) {
    return res.status(500).json({success:true,message:error})
  }
};
const rideStatus = async(req:Request,res:Response)=>{
  try {
    const response = await bookingService.updateBooking(
      req.params.id,
      {
        status:req.body.status,
      },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({success:false,message:"Enter Valid Booking ID or Value"});
    }
    return res.status(200).json({success:true,data:response,message:"Sucessfully Updated status"});
  } catch (error) {
    return res.status(500).json({success:false,message:error});
  }
}

const createBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.createBooking(req.body);
    if(!response){
      return res.status(404).json({success:false,message:'Enter Valid Field'})
    }
    await response.save();
    // mailForBooking(response);     //send mail after booking sucess
    return res.status(200).json({success:true,data:response})
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
    return res.status(200).json({success:true,data:response,message:"Sucessfully Updated"});
  } catch (error) {
    return res.status(500).json({success:false,message:error});
  }
};

const cancelBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.updateBooking(
      req.params.id,
    {
      status:'cancelled'
    },{new:true});    
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


export {viewBooking,createBooking,updateBooking,cancelBooking,getRevenue,totalBooking,bookingStatus,viewBookingById,rideStatus}
