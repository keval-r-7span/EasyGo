// import stripe from "../configs/stripe";
// import logger from '../configs/logger';
// import { Response,Request } from "express";

// export const payment = async(req:Request,res:Response)=>{
//     try {
//     const {amount,method,status} = req.body
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       method,
//       status,
//     });
//     return res.status(200).send(paymentIntent);
//   } catch (error) {
//     logger.error(error)
//    return res.status(500).send('Error processing payment.');
//   }
// };
