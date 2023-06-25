import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {SignIn} from '../pages/auth/SignIn';
import {SignUp} from '../pages/auth/SignUp';

type AuthRoutesList = {
  signUp: undefined;
  signIn: undefined;
};

export type AppNavigatorAuthRoutesProps =
  NativeStackNavigationProp<AuthRoutesList>;

const {Navigator, Screen} = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="signUp" component={SignUp} />
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
}
