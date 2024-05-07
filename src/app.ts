import express,{Request,Response} from 'express';
import connectDB from './configs/dbConnection';
import indexRoute from './routes';
import {PORT} from './helper/constants';
import logger from './configs/logger';
import cors from 'cors'
import stripe from './configs/stripe';
const app = express();

app.use(express.json());
app.use(cors())
// Define routes
app.use("/api/v1", indexRoute);

app.get("/",(req:Request,res:Response)=>{
  res.status(200).send("🚀Welcome to EasyGo-API 🚕..")
})


app.post('/api/v1/payment/checkout',async (req,res)=>{
  const{booking,amount,tokenId} = req.body
  const lineItem = booking.map((booking:any)=>({
      price_data:{
        currency: "inr",
        booking_data:{
          fullName:booking.fullname,
          cardNumber:booking.cardNumber,
          endDate:booking.endDate,
          CVV:booking.CVV,
          zipCode:booking.zipCode
        },
        amount:booking.price*100
      }
    }))
  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:'',
    mode:'payment',

  })
})
 
// Start the server
app.listen(PORT, ():void => {
  logger.info(`🚀 Server is running.. on http://localhost:${PORT}🚀..`);
  // Connect to MongoDB Atlas .
  connectDB()
});

export default app