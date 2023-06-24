import {NavigationContainer} from '@react-navigation/native';
import {AuthRoutes} from './src/routes/AuthRoutes';
export default function App() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
