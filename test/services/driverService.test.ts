import { driverService } from '../../src/services/driverService';
import driverSchema from '../../src/models/driverModel';
// import { vehicleService } from '../../src/services/vehicleService';

jest.mock('../../src/models/driverModel');

describe('driverService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  
  it('viewDriver should call find method of driverSchema model', async () => {
    const mockFind = jest.spyOn(driverSchema, 'find').mockResolvedValueOnce([]);
    await driverService.viewDriver();
    expect(mockFind).toHaveBeenCalled();
  });

  it('viewDriverById should call findById and findVehicle methods with correct id', async () => {
    const mockFindById = jest.spyOn(driverSchema, 'findById').mockResolvedValueOnce({});
    // const mockFindVehicle = jest.spyOn(vehicleService, 'findVehicle').mockResolvedValueOnce([]);
    const id = 'yourId';
    await driverService.viewDriverById(id);
    expect(mockFindById).toHaveBeenCalledWith(id);
    // expect(mockFindVehicle).toHaveBeenCalledWith({ driverId: id });
  });

  it('deleteDriver should call findByIdAndDelete method with correct id', async () => {
    const mockFindByIdAndDelete = jest.spyOn(driverSchema, 'findByIdAndDelete').mockResolvedValueOnce({});
    const id = 'yourId';
    await driverService.deleteDriver(id);
    expect(mockFindByIdAndDelete).toHaveBeenCalledWith(id);
  });

  it('updateDriver should call findByIdAndUpdate method with correct id and query', async () => {
    const mockFindByIdAndUpdate = jest.spyOn(driverSchema, 'findByIdAndUpdate').mockResolvedValueOnce({});
    const id = 'yourId';
    const updateQuery = {};
    await driverService.updateDriver(id, updateQuery);
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(id, updateQuery, { new: true });
  });

it('findDriver should call findOne method with correct query', async () => {
    const mockFindOne = jest.spyOn(driverSchema, 'findOne').mockResolvedValueOnce({});
    const query = {};
    await driverService.findDriver(query);
    expect(mockFindOne).toHaveBeenCalledWith(query);
  });

  it('findPhoneNumber should call findOne method with correct query', async () => {
    const mockFindOne = jest.spyOn(driverSchema, 'findOne').mockResolvedValueOnce({});
    const query = {phoneNumber: '1234567890'};
    await driverService.findPhoneNumber(query);
    expect(mockFindOne).toHaveBeenCalledWith(query);
  });

  it('updateBookingOTP should generate OTP and call findByIdAndUpdate', async () => {
    const mockFindByIdAndUpdate = jest.spyOn(driverSchema, 'findByIdAndUpdate').mockResolvedValueOnce({});
    const id = 'yourId';
    await driverService.updateBookingOTP(id);
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      id,
      expect.objectContaining({ digit: expect.any(Number) }),
      { new: true }
    );
  });

  it('updateBookingOTP should throw an error if driver not found', async () => {
    jest.spyOn(driverSchema, 'findByIdAndUpdate').mockResolvedValueOnce(null);
    const id = 'invalidId';
    await expect(driverService.updateBookingOTP(id)).rejects.toThrow('Driver not found');
  });

  it('verifyBookingOTP should return true if OTP matches', async () => {
    const mockFindById = jest.spyOn(driverSchema, 'findById').mockResolvedValueOnce({ digit: 1234 });
    const id = 'yourId';
    const otp = '1234';
    const result = await driverService.verifyBookingOTP(id, otp);
    expect(mockFindById).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });

  it('verifyBookingOTP should return false if OTP does not match', async () => {
    const mockFindById = jest.spyOn(driverSchema, 'findById').mockResolvedValueOnce({ digit: 1234 });
    const id = 'yourId';
    const otp = '5678';
    const result = await driverService.verifyBookingOTP(id, otp);
    expect(mockFindById).toHaveBeenCalledWith(id);
    expect(result).toBe(false);
  });

  it('verifyBookingOTP should throw an error if driver not found', async () => {
    jest.spyOn(driverSchema, 'findById').mockResolvedValueOnce(null);
    const id = 'invalidId';
    const otp = '1234';
    await expect(driverService.verifyBookingOTP(id, otp)).rejects.toThrow('Driver not found');
  });

});
