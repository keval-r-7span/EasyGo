import { sendRequestToDriver } from '../../src/utils/sendRequest';

describe('sendRequestToDriver', () => {
  it('should log the driver name and user location', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const driverName = {"name":'John Doe'};
    const userLocation = { latitude: 52.5200, longitude: 13.4050 };

    sendRequestToDriver(driverName, userLocation);

    expect(consoleSpy).toHaveBeenCalledWith(driverName);
    expect(consoleSpy).toHaveBeenCalledWith(userLocation);

    consoleSpy.mockRestore();
  });
});
