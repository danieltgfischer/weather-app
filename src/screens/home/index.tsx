import React from 'react';
import { Text } from 'react-native';
import format from 'date-fns/format';
import { LinearGradient } from 'expo-linear-gradient';
import WheatherCoordinates from '@/components/WeatherCoordinates';
import WheatherCurrent from '@/components/WeatherCurrent';
import { Colors } from '@/styles/constants';

const Home: React.FC = () => {
  const date = new Date();
  return (
    <LinearGradient
      className="flex-1 items-center justify-center"
      colors={[Colors.LIGHT_GRAY, Colors.DARKER_GRAY]}
      testID="home"
    >
      <Text className="text-gray-500 w-full text-left pl-8 text-xs">
        {format(date, "MMM dd','  yyyy")}
      </Text>
      <Text className="text-white w-full text-left pl-8 text-lg">
        {format(date, 'EEEE')}
      </Text>
      <WheatherCurrent />
      <Text className="text-white" testID="home-screen-divider">
        Or
      </Text>
      <WheatherCoordinates />
    </LinearGradient>
  );
};

export default Home;
