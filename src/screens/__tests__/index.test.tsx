import React from 'react';
import { render } from '@testing-library/react-native';
import App from '@/screens';

describe('App', () => {
  test.skip('Should render correctly', () => {
    const wrapper = render(<App />);
    wrapper.getByTestId('app');
   })
})
