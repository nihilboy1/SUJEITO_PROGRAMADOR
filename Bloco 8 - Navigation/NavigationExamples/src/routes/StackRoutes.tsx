import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {About} from '../pages/About';
import {Home} from '../pages/Home';
import {DrawerRoutes} from './DrawerRoutes';

type stackRoutesList = {
  home: undefined;
  about: undefined;
  drawerRoutes: undefined;
};

export type AppNavigatorStackRoutesProps =
  NativeStackNavigationProp<stackRoutesList>;

const {Navigator, Screen} = createNativeStackNavigator();
export function StackRoutes() {
  return (
    <Navigator>
      <Screen component={Home} name="home" />
      <Screen component={About} name="about" />
      <Screen component={DrawerRoutes} name="drawerRoutes" />
    </Navigator>
  );
}
