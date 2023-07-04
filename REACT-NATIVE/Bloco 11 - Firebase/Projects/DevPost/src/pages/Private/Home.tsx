import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import devPostLogoDark from '../../assets/devPostLogoDark.png';
import {NewPostModal} from '../../components/NewPostModal';
import {OpenModalWidget} from '../../components/OpenModalWidget';
import {PostsList} from '../../components/PostsList';
import {
  firebaseAddPost,
  firebaseGetNewerPostsFromAllUser,
  firebaseGetOlderPostsFromAllUser,
} from '../../connection/database';
import {useAuthContext} from '../../hooks/useAuthContext';
import {StackPrivateRoutesProps} from '../../routes/private.stack.routes';
import {colors, fonts} from '../../theme/theme';
import {getPostDTO} from '../../types/postDTO';

export function Home() {
  const {user} = useAuthContext();
  const {navigate} = useNavigation<StackPrivateRoutesProps>();

  const [posts, setPosts] = useState<getPostDTO[]>([]);
  const [posting, setPosting] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postPlaceholder, setPostPlaceholder] = useState<string>('');
  const [postContent, setPostContent] = useState('');

  const [lastPost, setLastPost] =
    useState<FirebaseFirestoreTypes.DocumentData>();
  const [modalVisible, setModalVisible] = useState(false);

  const [theresNoMorePosts, setTheresNoMorePosts] = useState(false);

  async function handleFirebaseGetNewerPostsFromAllUser() {
    if (theresNoMorePosts) {
      setIsLoadingPosts(false);
      Toast.show({
        type: 'info',
        text1: 'There is no more posts',
        position: 'bottom',
      });
      return;
    }
    if (isLoadingPosts) {
      return;
    }

    try {
      setIsLoadingPosts(true);
      if (lastPost) {
        const [newerPosts, theresNoMorePosts, lastPostFromNewer] =
          await firebaseGetNewerPostsFromAllUser(lastPost);
        setPosts(currentPosts => [...currentPosts, ...newerPosts]);
        setLastPost(lastPostFromNewer);
        setTheresNoMorePosts(theresNoMorePosts);
        if (theresNoMorePosts) {
          setIsLoadingPosts(false);

          Toast.show({
            type: 'info',
            text1: 'There is no more posts',
            position: 'bottom',
          });
          return;
        }
      }
    } catch (error) {
      console.log('Erro na função handleFirebaseGetNewerPosts');
      throw error;
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function handlefirebaseGetOlderPostsFromAllUser() {
    try {
      setIsLoadingPosts(true);
      firebaseGetOlderPostsFromAllUser().then(response => {
        const [olderPosts, theresNoMorePosts, lastPostFromOlder] = response;
        if (olderPosts !== undefined) {
          setPosts(olderPosts);
          setLastPost(lastPostFromOlder);
          setTheresNoMorePosts(theresNoMorePosts);
        }
      });
    } catch (error) {
      console.log('Erro na função handleFirebaseGetOlderPosts');
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function handlefirebaseAddPost() {
    try {
      setPosting(true);
      if (user?.uid) {
        await firebaseAddPost(postContent, user);
        setPostContent('');
      }
    } catch (error) {
      console.log('Erro na função handlefirebaseAddPost');
    } finally {
      setPosting(false);
      setModalVisible(false);
      setTheresNoMorePosts(false);
      setIsLoadingPosts(false);
      setPostContent('');
      if (lastPost) {
        handleFirebaseGetNewerPostsFromAllUser();
      } else {
        handlefirebaseGetOlderPostsFromAllUser();
      }
    }
  }

  function getRandomPlaceholder() {
    const placeholderPhrases: string[] = [
      'Share your thoughts.',
      "Tell us what's new.",
      'Got something to say?',
      'Share your story.',
      'Write it down!',
      "What's on your mind?",
      'Got news to share?',
      'Express yourself!',
      'Speak your mind.',
      'Write away!',
    ];
    const random = Math.floor(Math.random() * placeholderPhrases.length);
    setPostPlaceholder(placeholderPhrases[random]);
  }

  useFocusEffect(
    useCallback(() => {
      handlefirebaseGetOlderPostsFromAllUser();
      getRandomPlaceholder();
    }, []),
  );

  return (
    <View style={S.container}>
      <Animatable.View animation="fadeInDown" style={S.header}>
        <Image source={devPostLogoDark} />
        <TouchableOpacity
          onPress={() => {
            navigate('search');
          }}
          style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Text style={S.moveToText}>Search</Text>
          <Feather name="search" color={colors.text} size={22} />
        </TouchableOpacity>
      </Animatable.View>
      <PostsList
        getNewPosts={handleFirebaseGetNewerPostsFromAllUser}
        getBasePosts={firebaseGetOlderPostsFromAllUser}
        isLoadingPosts={isLoadingPosts}
        posts={posts}
      />
      <NewPostModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        postPlaceholder={postPlaceholder}
        posting={posting}
        postContent={postContent}
        setPostContent={setPostContent}
        handlefirebaseAddPost={handlefirebaseAddPost}
      />
      <OpenModalWidget iconName="pencil" setModalVisible={setModalVisible} />
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 15,
    paddingTop: 5,
    backgroundColor: colors.background,
  },

  header: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  moveToText: {
    color: colors.text,
    fontSize: 20,
    fontFamily: fonts.mono,
  },
});
