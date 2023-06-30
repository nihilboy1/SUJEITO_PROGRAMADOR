import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PostsList} from '../../components/PostsList';
import {firebaseGetAllPostsFromAUser} from '../../connection/database';
import {useAuthContext} from '../../hooks/useAuthContext';
import {userPostsRouteProps} from '../../routes/private.stack.routes';
import {postDTO} from '../../types/postDTO';

export function UserPosts() {
  const {user} = useAuthContext();
  const {navigate, goBack} = useNavigation();
  const [userPosts, setUserPosts] = useState<postDTO[]>([]);
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
    <SafeAreaView style={S.safeContainer}>
      <View style={S.innerContainer}>
        <TouchableOpacity onPress={goBack} style={S.goBackButton}>
          <Text style={S.goBackTextIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={S.postsAuthor}>
          {user?.name == name ? 'Seus Posts' : name}
        </Text>
        <Text />
      </View>
      <PostsList
        getBasePosts={handleFirebaseGetAllPostsFromAUser}
        posts={userPosts}
        isLoadingPosts={isLoadingPosts}
      />
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safeContainer: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  goBackButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 30,
    borderRadius: 99,
  },

  goBackTextIcon: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },

  postsAuthor: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 5,
    marginBottom: 10,
    color: 'white',
  },
});
