import { UpdateQuery, QueryOptions } from "mongoose";
import paymentSchema, { Payment } from "../models/paymentModel";

export const createPayment = async (id: string) => {
  return await paymentSchema.create(id);
};

export const allPayment = async () => {
  return await paymentSchema.find();
};

export const updateStatus = async (
  id: string,
  query: UpdateQuery<Payment>,
  option: QueryOptions<Payment>
) => {
  return await paymentSchema.findByIdAndUpdate(id, query, option);
};
