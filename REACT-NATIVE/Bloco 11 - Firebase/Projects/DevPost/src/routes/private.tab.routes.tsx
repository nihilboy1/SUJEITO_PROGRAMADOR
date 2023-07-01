import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {Profile} from '../pages/Private/Profile';
import {Search} from '../pages/Private/Search';
import {colors} from '../theme/theme';
import {PrivateStackRoutes} from './private.stack.routes';

type TabPrivateRoutesList = {
  home_privateStack: undefined;
  search: undefined;
  profile: undefined;
};

export type TabPrivateRoutesProps =
  BottomTabNavigationProp<TabPrivateRoutesList>;
const {Navigator, Screen} = createBottomTabNavigator();

export function TabPrivateRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          backgroundColor: colors.lightBlue,
          borderTopWidth: 0,
        },
      }}>
      <Screen
        name="home_privateStack"
        component={PrivateStackRoutes}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Feather name="home" color={color} size={size} />;
          },
        }}
      />
      <Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Feather name="search" color={color} size={size} />;
          },
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Feather name="user" color={color} size={size} />;
          },
        }}
      />
    </Navigator>
  );
}
