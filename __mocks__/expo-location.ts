import { PermissionStatus } from 'expo-location';

export * from 'expo-location';

export const getCurrentPositionAsync = jest.fn().mockImplementation(() =>
  Promise.resolve({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  }),
);

export const requestForegroundPermissionsAsync = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({
      status: PermissionStatus.GRANTED,
    }),
  );
