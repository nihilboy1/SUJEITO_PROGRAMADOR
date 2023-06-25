import {NavigationContainer} from '@react-navigation/native';
import {App} from './src/App';
import {ContextProvider} from './src/context/AuthContext';
export default function Main() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </ContextProvider>
  );
}
