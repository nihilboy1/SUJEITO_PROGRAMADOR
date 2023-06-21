import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {Tela3} from '../pages/Tela3';
import {Tela4} from '../pages/tela4';

type drawerRoutesList = {
  tela3: undefined;
  tela4: undefined;
};

export type AppNavigatorStackRoutesProps =
  DrawerNavigationProp<drawerRoutesList>;

const {Navigator, Screen} = createDrawerNavigator();
export function DrawerRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen component={Tela3} name="tela3" />
      <Screen component={Tela4} name="tela4" />
    </Navigator>
  );
}
