import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Home} from '../pages/Private/Home';
import {NewPost} from '../pages/Private/NewPost';
import {UserPosts} from '../pages/Private/UserPosts';
type StackPrivateRoutesList = {
  newpost: undefined;
  userposts: undefined;
  home: undefined;
};

export type StackPrivateRoutesProps =
  NativeStackNavigationProp<StackPrivateRoutesList>;
const {Navigator, Screen} = createNativeStackNavigator();

export function PrivateStackRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} options={{headerShown: false}} />
      <Screen
        name="newpost"
        component={NewPost}
        options={{
          title: 'Novo Post',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#36393f',
          },
        }}
      />
      <Screen
        name="userposts"
        component={UserPosts}
        options={{
          title: 'User posts',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#36393f',
          },
        }}
      />
    </Navigator>
  );
}
