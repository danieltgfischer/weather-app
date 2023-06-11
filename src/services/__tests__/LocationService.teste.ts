import { LocationPermissionResponse, PermissionStatus } from 'expo-location';
import LocationService from '../LocationService';

const permissionMock: LocationPermissionResponse = {
  expires: 'never',
  status: PermissionStatus.GRANTED,
  canAskAgain: false,
  granted: false,
};

describe('LocationService', () => {
  test('Should return latitude & longitude from current location', async () => {
    const mockLocation = {
      latitude: 0,
      longitude: 0,
    };
    const position = await LocationService.getCurrentPosition();
    expect(position).toEqual(mockLocation);
  });

  test('Should return granted when request is accepted', async () => {
    const { status } = await LocationService.getPermission();
    expect(status).toBe('granted');
  });

  test('Should return reject when denied the request', async () => {
    jest.spyOn(LocationService, 'getPermission').mockResolvedValue({
      ...permissionMock,
      status: PermissionStatus.DENIED,
    });

    const { status } = await LocationService.getPermission();
    expect(status).toBe(PermissionStatus.DENIED);
  });
});
