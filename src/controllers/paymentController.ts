import stripe from "../configs/stripe";
import logger from '../utils/logger';
import { Response,Request } from "express";

export const payment_checkout = async(req:Request,res:Response)=>{
    try {
      const { booking } = req.body;
      const lineItems = booking.map((bookingItem:any) => ({
        price_data: {
          currency: "inr",
          product_data: {
              name: bookingItem.fullName,
          },
          unit_amount: bookingItem.price * 100,
        },
        quantity: 1,
      }));    
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel'
      });
      return res.status(200).json({success:true, session_id: session.id });
    } catch (err) {
      logger.error("error in stripe"+ err)
      return res.status(500).json({ error: "An error occurred during checkout."+ err });
    }
}

