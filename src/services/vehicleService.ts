import  vehicleDetails  from '../models/vehicleDetails';

export const findVehicle = async (query: any) => { 
  try {
    return await vehicleDetails.findOne(query);
  } catch (error) {
    throw error;
  }
};

export const addVehicle = async (query: any) => {
  try {
    return await vehicleDetails.create(query);
  } catch (error) {
    throw error;
  }
};

export const updateVehicleDetails = async (id: string, query: any) => {
  try {
    return await vehicleDetails.findByIdAndUpdate(id, query);
  } catch (error) {
    throw error;
  }
};

export const vehicleService =  {findVehicle,addVehicle,updateVehicleDetails}