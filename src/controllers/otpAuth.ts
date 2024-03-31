import { Request, Response, NextFunction } from "express";
import { TWILIO } from "../helper/constants";
import twilio from "twilio";
const client = twilio(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);

const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { phoneNumber } = req.body;
  try {
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verifications.create({
        to: `+91${phoneNumber}`,
        channel: "sms",
      });
    return res.status(200).json({ sucess: true, data: response });
  } catch (error) {
    console.log(error);
    return res.json({ sucess: false, data: "ERROR" });
  }
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { phoneNumber, otp } = req.body;
  try {
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      });
    console.log(response);
    return res.status(200).json({ sucess: true, data: response });
  } catch (error) {
    console.log(error);
    return res.json({ sucess: false, data: "ERROR" });
  }
};

export { sendOtp, verifyOtp };
