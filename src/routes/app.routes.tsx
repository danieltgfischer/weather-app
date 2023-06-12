import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/screens/home';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import Weather from '@/screens/weather';
import { Routes } from './routes';

export type RootStackParamList = {
  Home: undefined;
  Weather: {
    latitude: number;
    longitude: number;
  };
};

export type useNavigationType = NavigationProp<RootStackParamList>;

const StackNavigator = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={Routes.HOME}
        screenOptions={{ headerShown: false }}
      >
        <StackNavigator.Screen name={Routes.HOME} component={Home} />
        <StackNavigator.Screen name={Routes.WEATHER} component={Weather} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
