import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';

import {NewPostModal} from '../../components/NewPostModal';
import {NewPostWidget} from '../../components/NewPostWidget';
import {PostsList} from '../../components/PostsList';
import {
  firebaseAddPost,
  firebaseGetNewerPostsFromAllUser,
  firebaseGetOlderPostsFromAllUser,
} from '../../connection/database';
import {useAuthContext} from '../../hooks/useAuthContext';
import {colors} from '../../theme/theme';
import {getPostDTO} from '../../types/postDTO';
export function Home() {
  const [posts, setPosts] = useState<getPostDTO[]>([]);
  const [posting, setPosting] = useState(false);

  const {user} = useAuthContext();
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
        text1: 'There is no more posts to show',
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
            text1: 'There is no more posts to show',
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
      if (postContent === '') {
        console.log('O post não pode estar vazio');
        return;
      }
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
        setPostContent={setPostContent}
        handlefirebaseAddPost={handlefirebaseAddPost}
      />
      <NewPostWidget setModalVisible={setModalVisible} />
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 15,
    backgroundColor: colors.gray,
  },
});
