import { Request,Response } from 'express';
import { bookingService } from '../services/bookingService';

const viewBooking = async (req:Request, res:Response)=> {
  try {
    const response = await bookingService.viewBookingAll()
    if (!response) {
     return res.json({sucess:false,data:"No Booking Available"})
    }
    return res.status(200).json({sucess:true,data:response})
  } catch (error) {
    console.log(error);
    return res.json({sucess:false,data:"Error in viewBooking"})
  }
};

const viewBookingById = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.viewBooking(req.params.id);
    if (!response) {
      return res.json({sucess:false,data:"No Booking Available"})
    }
    return res.status(200).json({sucess:true,data:response})
  } catch (error) {
    return res.status(200).json({sucess:true,message:error})
  }
};

const bookingStatus = async (req:Request, res:Response) => {
  try {
    const status = req.body.status || req.query.status;
    const response = await bookingService.viewBookingFilter({ status });
    if(!response){
      return res.status(200).json({sucess:true,message:"No Data Found."})
    }
    return res.status(200).json({sucess:true,data:response})
  } catch (error) {
    return res.status(200).json({sucess:true,message:error})
  }
};

const createBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.createBooking(req.body);
    if(!response){
      return res.status(400).json({sucess:false,message:'Enter Valid Field'})
    }
    await response.save();
    // mailForBooking(response);     //send mail after booking sucess
    return res.status(200).json({sucess:true,data:response})
  } catch (error) {
    return res.status(200).json({sucess:false,message:error});
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
      return res.status(200).json({sucess:false,message:"Enter Valid Booking ID or Value"});
    }
    return res.status(200).json({sucess:true,data:response});
  } catch (error) {
    return res.status(200).json({sucess:false,message:error});
  }
};

const cancelBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.cancelBooking(req.params.id);
    if (!response) {
      return res.status(200).json({sucess:false,message:"Enter valid Booking"});
    }
    return res.status(200).json({sucess:true,data:response,message:"Booking Cancel Suceesfully."});
  } catch (error) {
    return res.status(404).json({sucess:false,message:error});
  }
};

const changeRideStatus = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const response = await bookingService.rideComplete(id);
    if (!response) {
      return res.status(200).json({sucess:false,message:"Enter Valid Ride"});
    }
    response.status = "completed";
    await response.save();
    return res.status(200).json({sucess:true,data:response,message:"Ride change Suceesfully."});
  } catch (error) {
    return res.status(404).json({sucess:false,message:error});
  }
};

const paymentStatus = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.rideComplete(req.params.id);
    if (!response) {
       return res.status(200).json({sucess:false,message:"Enter Valid Payment Status id"}); ;
    }
    response.payment_status = "completed";
    await response.save();
    return res.status(200).json({sucess:true,data:response,message:"Ride payment complete Suceesfully."});
  } catch (error) {
    return res.status(404).json({sucess:false,message:error});
  }
};

const getRevenue = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.getRevenue();
    if (!response) {
      return res.status(200).json({sucess:false,message:"No Any Revenue Found "});
    }
    return res.status(200).json({sucess:true,data:response,message:"Generate total Revenue"});
  } catch (error) {
    return res.status(404).json({sucess:false,message:error});
  }
};

const totalBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.aggregateBookings();
    if (!response) {
      return res.status(200).json({sucess:false,message:"No Any Booking Found "});
    }
    return res.status(200).json({sucess:true,data:response,message:"Generate total Booking"});
  } catch (error) {
    return res.status(404).json({sucess:false,message:error});
  }
};


export {viewBooking,createBooking,updateBooking,cancelBooking,getRevenue,totalBooking,paymentStatus,changeRideStatus,bookingStatus,viewBookingById}
