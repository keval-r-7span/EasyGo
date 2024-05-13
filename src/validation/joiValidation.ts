import { NextFunction,Request,Response } from 'express';
import { bookingJoiSchema} from '../models/bookingModel';
import {ValidationResult,Schema}from 'joi';

const schemas:Record<string,Schema> = {
  booking:bookingJoiSchema,
}
interface validateDataInput{
  property1:string,
  property2:number
}
const validateData = (model:string,data:validateDataInput):ValidationResult=>{
  const schema = schemas[model];  
  return schema.validate(data)
}

export const validateRequest = (req:Request, res:Response, next:NextFunction) => { 
    const {error} = validateData(req.originalUrl.split('/').at(3)!,req.body)
    if (error) {
    return res.status(404).json({success:false,message:"joischema validation error"+error.details[0].message})
    } 
    next();
};

