import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Tela1} from '../pages/Tela1';
import {Tela2} from '../pages/Tela2';
import {StackRoutes} from './StackRoutes';

type TabRoutesList = {
  tela1: undefined;
  tela2: undefined;
  homeStack: undefined;
};

export type AppNavigatorTabRoutesProps = BottomTabNavigationProp<TabRoutesList>;

const {Navigator, Screen} = createBottomTabNavigator<TabRoutesList>();

export function TabRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen component={StackRoutes} name="homeStack" />
      <Screen component={Tela1} name="tela1" />
      <Screen component={Tela2} name="tela2" />
    </Navigator>
  );
}
