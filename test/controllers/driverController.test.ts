// import supertest from "supertest";
// import { app } from "../../src/app";
// import { setupDB } from "../../src/configs/memoryServer";

// describe("Test request with Mongo-inMemory-Server", () => {
//   setupDB();

//     describe("Get list of driver", () => {

//       it("Should retrieve list of driver", async () => {
//         const res = await supertest(app).get(`/api/v1/driver/`);
//         expect(res.status).toBe(200);
//         expect(res.body.success).toBe(true);
//       });

//       it("should return 404 if no ID is invalid", async () => {
//         const id = "663386553a51e2bc35eb3002"
//         const response = await supertest(app).get(`/api/v1/driver/${id}`)
//         expect(response.status).toBe(404)
//       });

//       // it("Should get driver with id", async () => {
//       //   const payload = {
//       //     id: "663dae4dadbf9e3d34b43d05"
//       //   }
//       //   const response = await supertest(app).get(`/api/v1/driver/${payload.id}`)
//       //   expect(response.status).toBe(200);
//       // });

//       it("Should give 500 internal server error", async () => {
//         const id = "663386553a51e2bc35eb300"
//         const response = await supertest(app).get(`/api/v1/driver/${id}`)
//         expect(response.status).toBe(500)
//       });

//     });
      
//     describe("Delete customer by their id", () => {
        
//         // it("Should check return 404 id doesn't exist", async () => {
//         //   const payload = {
//         //     id: "6634750d0cbb8b710ad5d"
//         //   }
//         //   const response = await supertest(app).delete(`/api/v1/driver/${payload.id}`).send()
//         //   expect(response.status).toBe(404)
//         // });

//         it("Should check return 500 id doesn't exist", async () => {
//           const payload = {
//             id: "6634750d0cbb8b710ad5d"
//           }
//           const response = await supertest(app).delete(`/api/v1/driver/${payload.id}`).send()
//           expect(response.status).toBe(500)
//         });
        
//     });

// });



import request from 'supertest';
import express, { Request, Response } from 'express';
import { getDriver } from '../../src/controllers/driverController';
import {driverService} from '../../src/services/driverService';
import logger from '../../src/utils/logger';

const app = express();
app.get('/driver', getDriver);

// Mocking the driverService and logger
jest.mock('./path-to-your-driverService');
jest.mock('./path-to-your-logger');

describe('GET /driver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the driver data when a valid ID is provided', async () => {
    const mockDriver = { id: '1', name: 'John Doe' };
    (driverService.viewDriverById as jest.Mock).mockResolvedValue(mockDriver);

    const response = await request(app).get('/driver').query({ id: '1' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Driver found',
      data: mockDriver,
    });
    expect(logger.info).toHaveBeenCalledWith('Get Driver by id is successful.');
  });

  it('should return 404 when an invalid ID is provided', async () => {
    (driverService.viewDriverById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/driver').query({ id: 'invalid-id' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Invalid ID',
    });
    expect(logger.error).toHaveBeenCalledWith('Invalid ID while get driver.');
  });

  it('should return 200 and the list of drivers when no ID is provided', async () => {
    const mockDrivers = [{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }];
    (driverService.viewDriver as jest.Mock).mockResolvedValue(mockDrivers);

    const response = await request(app).get('/driver');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'List of drivers found',
      data: mockDrivers,
    });
  });

  it('should return 500 when there is an error', async () => {
    (driverService.viewDriver as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/driver');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Error in getDriver',
    });
    expect(logger.error).toHaveBeenCalledWith('Error in getDriver.', expect.any(Error));
  });
});
