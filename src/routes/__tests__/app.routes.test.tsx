import React, { useEffect } from 'react';
import { View } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import HomeScreen from '@/screens/home';
import Weather from '@/screens/weather';
import AppNavigator, { RootStackParamList } from '../app.routes';
import { Routes } from '../routes';

jest.mock('@/screens/home', () => jest.fn());
jest.mock('@/screens/weather', () => jest.fn());

describe('AppNavigator', () => {
  test('Should render Home screen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );
    const wrapper = render(<AppNavigator />);
    await waitFor(() => {
      wrapper.getByTestId('mock-home-screen');
    });
  });

  test('Should render Weather in its route', async () => {
    (HomeScreen as jest.Mock).mockImplementationOnce(() => {
      const navigation = useNavigation<NavigationProp<RootStackParamList>>();

      useEffect(() => {
        navigation.navigate(Routes.WEATHER, { latitude: 0, longitude: 0 });
      }, [navigation]);

      return null;
    });

    (Weather as jest.Mock).mockReturnValueOnce(
      <View testID="mock-weather-screen" />,
    );
    const wrapper = render(<AppNavigator />);
    await waitFor(() => {
      wrapper.getByTestId('mock-weather-screen');
    });
  });
});
