import React from 'react';
import WeatherCurrent from '@/components/WeatherCurrent';
import { render } from '@testing-library/react-native';

describe('WheatherCurrent', () => {
  test('Should render correctly', () => {
      const wrapper = render(<WeatherCurrent />);
      wrapper.getByTestId('weather-current');
   });
 });
