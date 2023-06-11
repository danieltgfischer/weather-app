import React from 'react';
import Home from '@/screens/home';
import { render } from '@testing-library/react-native';

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
});
