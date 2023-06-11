import React from 'react';
import { render } from '@testing-library/react-native';
import Weather from '../weather';

describe('Weather', () => {
  test('Should render Weather correctly', () => {
    const wrapper = render(<Weather />);
    wrapper.getByTestId('weather-screen');
  });
});
