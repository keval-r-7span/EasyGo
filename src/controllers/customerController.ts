import { Request, Response } from "express";
import { customerService } from "../services/userService";
import { string } from "joi";

const getCustomer = async (req: Request, res: Response) => {
  try {
    const response = await customerService.viewCustomer();
    return res.status(200).json({ sucess: true, data: response });
  } catch (error) {
    console.log(error);
    return res.json({ sucess: false, data: "ERROR" });
  }
};

const getCustomerByID = async (req: Request, res: Response) => {
  try {
    const response = await customerService.viewCustomerById(req.params.id);
    return res.status(200).json({ sucess: true, data: response });
  } catch (error) {
    console.log(error);
    return res.json({ sucess: false, data: "ERROR" });
  }
};

const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, role } = req.body;
    const response = await customerService.updateCustomer(req.params.id, {
      name,
      email,
      phoneNumber,
      role,
    });
    console.log(response);
    return res.status(200).json({ sucess: true, data: response });
  } catch (error) {
    console.log(error);
    return res.json({ sucess: false, data: "ERROR" });
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const response = await customerService.deleteCustomer(req.params.id);
    return res.status(200).json({ sucess: true, data: response });
  } catch (error) {
    console.log(error);
    return res.json({ sucess: false, data: "ERROR" });
  }
};

export { getCustomer, getCustomerByID, updateCustomer, deleteCustomer };
