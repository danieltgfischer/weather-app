import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  test('Shoul render Button correctly', () => {
    const wrapper = render(<Button label="" onPress={jest.fn()} />);
    wrapper.getByTestId('button');
  });

  test('Should render loader when loading', () => {
    const wrapper = render(<Button label="" onPress={jest.fn()} loading />);
    wrapper.getByTestId('button-loading');
  });

  test('Should call given onPress when clicked', () => {
    const mockOnPress = jest.fn();
    const wrapper = render(<Button label="" onPress={mockOnPress} loading />);
    const button = wrapper.getByTestId('button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('Should render label', () => {
    const wrapper = render(<Button label="mock-label" onPress={jest.fn()} />);
    wrapper.getByText('mock-label');
  });

  test('Should accept custom Button props', () => {
    const wrapper = render(
      <Button label="" onPress={jest.fn()} testID="mock-testID" />,
    );
    wrapper.getByTestId('mock-testID');
  });
});
