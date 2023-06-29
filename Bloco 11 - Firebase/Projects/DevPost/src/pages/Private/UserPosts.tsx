import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {firebaseGetAllPostsFromAUser} from '../../connection/database';
import {userPostsRouteProps} from '../../routes/private.stack.routes';
import {postDTO} from '../../types/postDTO';

export function UserPosts() {
  const [userPosts, setUserPosts] = useState<postDTO[]>();
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const route = useRoute();
  const {uid, name} = route.params as userPostsRouteProps;

  async function handleFirebaseGetAllPostsFromAUser() {
    try {
      setIsLoadingPosts(true);
      firebaseGetAllPostsFromAUser(uid).then(posts => {
        setUserPosts(posts);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPosts(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleFirebaseGetAllPostsFromAUser();
    }, []),
  );
  return (
    <SafeAreaView style={{flex: 1, borderWidth: 1}}>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            marginTop: 5,
          }}>
          {name} POSTS
        </Text>
      </View>
      <Text>Posts do usuário: {name}</Text>
    </SafeAreaView>
  );
}
