import {ActivityIndicator, View} from 'react-native';
import {useAuthContext} from '../hooks/useAuthContext';
import {AuthRoutes} from './auth.routes';
import {TabPrivateRoutes} from './private.tab.routes';

export function Routes() {
  const {loggedInUser, isLocalUserFetched} = useAuthContext();
  if (!isLocalUserFetched) {
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
  return loggedInUser ? <TabPrivateRoutes /> : <AuthRoutes />;
}
