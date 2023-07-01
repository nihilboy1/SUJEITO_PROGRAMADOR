import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {PostsList} from '../../components/PostsList';
import {firebaseGetAllPostsFromAUser} from '../../connection/database';
import {useAuthContext} from '../../hooks/useAuthContext';
import {userPostsRouteProps} from '../../routes/private.stack.routes';
import {colors} from '../../theme/theme';
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
        <Pressable style={S.buttonBack} onPress={() => goBack()}>
          <Feather name="chevron-left" size={32} color={colors.black} />
        </Pressable>
        <Text style={S.postsAuthor}>
          {user?.name == name ? 'Seus Posts' : name}
        </Text>
        <Pressable style={[S.buttonBack, S.invi]}>
          <Feather name="chevron-left" size={32} color={colors.black} />
        </Pressable>
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
  invi: {
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  safeContainer: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonBack: {
    backgroundColor: colors.lightBlue,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 8,
    paddingRight: 10,
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
