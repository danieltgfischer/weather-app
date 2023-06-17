import React from 'react';
import WeatherCurrent from '@/components/WeatherCurrent';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/routes/routes';
import LocationService from '@/services/LocationService';
import { act } from 'react-test-renderer';
import { Colors } from '@/styles/constants';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual<object>('@react-navigation/native'),
  useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() }),
}));

describe('WheatherCurrent', () => {
  beforeEach(() => {
    cleanup();
  });
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByTestId('weather-button');
  });

  test('Should display label', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByText('Weather at my position');
  });

  test('Should navigate to Weather screen with location', async () => {
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

  describe('Loader', () => {
    test('Should be rendered when position is being fetched', async () => {
      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            mockResolve = resolve;
          }),
      );

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-button');
      fireEvent.press(button);

      await expect(
        wrapper.findByTestId('button-loading'),
      ).resolves.toBeDefined();

      await act(async () => {
        await mockResolve({ latitude: 0, longitude: 0 });
      });
    });

    test('Should not be rendered when position has been fetched', async () => {
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-button');
      fireEvent.press(button);
      return waitForElementToBeRemoved(() =>
        wrapper.getByTestId('button-loading'),
      );
    });

    test('Should not display when service trhow an error', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-button');
      fireEvent.press(button);
      return waitForElementToBeRemoved(() =>
        wrapper.getByTestId('button-loading'),
      );
    });
  });

  describe('Error', () => {
    const errorStyle = {
      borderBottomColor: Colors.ERROR,
      borderLeftColor: Colors.ERROR,
      borderRightColor: Colors.ERROR,
      borderTopColor: Colors.ERROR,
    };
    test('Should be displayed after fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-button');
      fireEvent.press(button);
      await waitFor(() => {
        expect(button).toHaveStyle(errorStyle);
      });
    });

    test('Should be reset after fetching position again', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-button');
      fireEvent.press(button);
      await waitFor(() => {
        fireEvent.press(button);
        expect(button).not.toHaveStyle(errorStyle);
      });
    });
  });
});
