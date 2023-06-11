import React from 'react';
import WeatherCoordinates from '@/components/WeatherCoordinates';
import { render } from '@testing-library/react-native';

describe('WheatherCoordinates', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCoordinates />);
    wrapper.getByTestId('weather-coordinates');
  });
});
