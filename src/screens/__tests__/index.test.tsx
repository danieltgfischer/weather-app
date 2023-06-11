import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '@/routes/app.routes';
import { View } from 'react-native';

jest.mock('@/routes/app.routes', () => jest.fn());

describe('App', () => {
  test('Should render correctly', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-navigator" />,
    );
    const wrapper = render(<AppNavigator />);
    wrapper.getByTestId('mock-navigator');
  });
});
