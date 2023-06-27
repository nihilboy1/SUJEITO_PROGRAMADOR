import {ActivityIndicator, View} from 'react-native';
import {AuthRoutes} from './auth.routes';
import {PrivateRoutes} from './private.routes';
import { useAuthContext } from '../hooks/useAuthContext';

export function Routes() {
  const {loggedInUser} = useAuthContext()
  const loading = false;
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={45} color="#e52246" />
      </View>
    );
  }
  return loggedInUser ? <PrivateRoutes /> : <AuthRoutes />;
}
