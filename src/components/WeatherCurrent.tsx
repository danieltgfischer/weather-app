import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/routes/routes';
import { useNavigationType } from '@/routes/app.routes';
import LocationService from '@/services/LocationService';
import Button from './Button';

const WheatherCurrent: React.FC = () => {
  const navigation = useNavigation<useNavigationType>();

  const handleFetchWeather = useCallback(async () => {
    const position = await LocationService.getCurrentPosition();
    navigation.navigate(Routes.WEATHER, position);
  }, [navigation]);

  return (
    <View testID="weather-current" className="w-full items-center my-4">
      <Button
        label="Weather current"
        onPress={handleFetchWeather}
        testID="weather-button"
      />
    </View>
  );
};

export default WheatherCurrent;
