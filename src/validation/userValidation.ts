import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  role: Joi.string().required(),
});

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userJoiSchema.validate(req.body);
  if (error) {
    console.log(res, error.details[0].message);
  }
  next();
};

export default validateRequest;