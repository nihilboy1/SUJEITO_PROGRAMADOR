import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Home } from '../pages/Private/Home';
import { Search } from '../pages/Private/Search';
import { Profile } from '../pages/Private/Profile';

type TabPrivateRoutes = {
  home: undefined,
  search: undefined,
  profile: undefined,
};

export type TabPrivateRoutesProps = BottomTabNavigationProp<TabPrivateRoutes>;
const {Navigator, Screen} = createBottomTabNavigator();
export function PrivateRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} options={{headerShown: false}} />
      <Screen name="search" component={Search} options={{headerShown: false}} />
      <Screen name="profile" component={Profile} options={{headerShown: false}} />
    </Navigator>
  );
}
