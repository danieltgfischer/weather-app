import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/routes/routes';
import { useNavigationType } from '@/routes/app.routes';
import LocationService from '@/services/LocationService';
import Button from './Button';

const WheatherCurrent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation<useNavigationType>();

  const handleFetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      const position = await LocationService.getCurrentPosition();
      navigation.navigate(Routes.WEATHER, position);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, [navigation]);

  return (
    <Button
      label="Weather at my position"
      onPress={handleFetchWeather}
      testID="weather-button"
      loading={loading}
      textStyle={error ? 'border border-red-600 border-1 rounded-lg' : ''}
    />
  );
};

export default WheatherCurrent;
