import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Home} from '../pages/Private/Home';
import {Search} from '../pages/Private/Search';
import {UserPosts} from '../pages/Private/UserPosts';

export type userPostsRouteProps = {
  uid: string;
  name: string;
};
type StackPrivateRoutesList = {
  userposts: userPostsRouteProps;
  search: undefined;
  home: undefined;
};

export type StackPrivateRoutesProps =
  NativeStackNavigationProp<StackPrivateRoutesList>;
const {Navigator, Screen} = createNativeStackNavigator();

export function PrivateStackRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="userposts" component={UserPosts} />
      <Screen name="search" component={Search} />
    </Navigator>
  );
}
