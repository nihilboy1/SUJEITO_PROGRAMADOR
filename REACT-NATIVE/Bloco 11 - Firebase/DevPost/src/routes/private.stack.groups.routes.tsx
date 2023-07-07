import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Groups} from '../pages/Private/Groups';
import {SearchGroups} from '../pages/Private/SearchGroups';

type GroupsRoutesProps = {
  searchGroups: undefined;
  groups: undefined;
};

export type GroupsStackPrivateRoutesProps =
  NativeStackNavigationProp<GroupsRoutesProps>;
const {Navigator, Screen} = createNativeStackNavigator();

export function PrivateStackGroupsRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="groups" component={Groups} />
      <Screen name="searchGroups" component={SearchGroups} />
    </Navigator>
  );
}
