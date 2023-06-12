import React from 'react';
import WeatherCurrent from '@/components/WeatherCurrent';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/routes/routes';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual<object>('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('WheatherCurrent', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByTestId('weather-current');
  });

  test.only('Should navigate to Weather screen with location', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });

    const wrapper = render(<WeatherCurrent />);
    const button = wrapper.getByTestId('weather-button');
    fireEvent.press(button);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(Routes.WEATHER, {
        longitude: 0,
        latitude: 0,
      });
    });
  });
});
