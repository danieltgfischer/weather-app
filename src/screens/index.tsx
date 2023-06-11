import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from '@/routes/app.routes';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
