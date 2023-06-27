import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContextProvider} from './src/contexts/AuthContext';
import {Routes} from './src/routes/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <SafeAreaView
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: '#36393f',
          }}>
          <StatusBar
            backgroundColor="#36393f"
            translucent={false}
            barStyle="light-content"
          />
          <Routes />
        </SafeAreaView>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
