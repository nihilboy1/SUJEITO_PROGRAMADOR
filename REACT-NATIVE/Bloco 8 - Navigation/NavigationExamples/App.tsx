import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {TabRoutes} from './src/routes/TabRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}
