import stripe from "../configs/stripe";
import logger from '../utils/logger';
import { Response,Request } from "express";

export const payment_checkout = async(req:Request,res:Response)=>{
    try {
      const {booking} = req.body;
      if (!booking || !Array.isArray(booking) || booking.length === 0) {
        return res.status(400).json({success:false, message: "Invalid booking data." });
      }
      const bookingItem = booking[0];
      const lineItems = {
      price_data: {
        currency: "inr",
        product_data: {
          name: bookingItem.fullName,
        },
        unit_amount: +(bookingItem.fare * 100)
      },
      quantity: 1,
    };
      
    const stripeCustomer = await stripe.customers.create({
      name: bookingItem.fullName,
      email: "admin@easygo.com",
      address: {
        line1: "7Span",
        line2: "Sola",
        postal_code: "145235",
        city: "Ahmedabad",
        state: "Gujarat",
        country: "India",
      },
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItems],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      customer: stripeCustomer.id,
    });
    return res.status(303).json({ success: true, data: session });
    } catch (err) {
      logger.error("error in stripe"+ err)
      return res.status(500).json({ error: "An error occurred during checkout."+ err });
    }
}