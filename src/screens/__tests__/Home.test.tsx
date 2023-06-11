import React from 'react';
import Home from '@/screens/home';
import { render } from '@testing-library/react-native';
import WeatherCurrent from '@/components/WeatherCurrent';
import { View } from 'react-native';
import WheatherCoordinates from '@/components/WeatherCoordinates';

jest.mock('@/components/WeatherCoordinates.tsx', () =>
  jest.fn().mockReturnValue(null),
);
jest.mock('@/components/WeatherCurrent.tsx', () =>
  jest.fn().mockReturnValue(null),
);

describe('Home', () => {
  test('Should render correctly', () => {
    const wrapper = render(<Home />);
    wrapper.getByTestId('home');
  });

  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(946692000000); // Saturday, 01 January 2000 00:00 UTC
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('Should contain current date', () => {
      const wrapper = render(<Home />);
      wrapper.getByText('Jan 01, 2000');
    });

    test('Should contain current day', () => {
      const wrapper = render(<Home />);
      wrapper.getByText('Saturday');
    });
  });

  test('Should contain a section to get current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-current" />,
    );
    const wrapper = render(<Home />);
    wrapper.getByTestId('mock-current');
  });

  test('Should contain a section to get coordinates weather', () => {
    (WheatherCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-coordinates" />,
    );
    const wrapper = render(<Home />);
    wrapper.getByTestId('mock-coordinates');
  });

  test('Should contain a divider between the current and coordinate components', () => {
    const wrapper = render(<Home />);
    wrapper.getByTestId('home-screen-divider');
  });
});
