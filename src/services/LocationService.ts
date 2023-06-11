import * as Location from 'expo-location';

export default class LocationService {
  static async getCurrentPosition(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    return Location.getCurrentPositionAsync({
      timeInterval: 15000,
    }).then(({ coords: { latitude, longitude } }) => ({
      latitude,
      longitude,
    }));
  }

  static async getPermission(): Promise<Location.LocationPermissionResponse> {
    return Location.requestForegroundPermissionsAsync();
  }
}
