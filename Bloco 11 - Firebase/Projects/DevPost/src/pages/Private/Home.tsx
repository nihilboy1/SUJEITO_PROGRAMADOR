import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import {Post} from '../../components/Post';

import {
  firebaseGetNewerPostsFromAllUser,
  firebaseGetOlderPostsFromAllUser,
} from '../../connection/database';
import {StackPrivateRoutesProps} from '../../routes/private.stack.routes';
import {postDTO} from '../../types/postDTO';
export function Home() {
  const {navigate} = useNavigation<StackPrivateRoutesProps>();
  const [posts, setPosts] = useState<postDTO[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [lastPost, setLastPost] =
    useState<FirebaseFirestoreTypes.DocumentData>();
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

  useFocusEffect(
    useCallback(() => {
      handlefirebaseGetOlderPostsFromAllUser();
    }, []),
  );
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        padding: 15,
        backgroundColor: 'grey',
      }}>
      <FlatList
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}
        data={posts}
        onEndReached={() => {
          handleFirebaseGetNewerPostsFromAllUser();
        }}
        onEndReachedThreshold={0.1}
        onRefresh={handlefirebaseGetOlderPostsFromAllUser}
        refreshing={isLoadingPosts}
        renderItem={({item}) => {
          return <Post postData={item} />;
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigate('newpost');
        }}
        style={{
          position: 'absolute',
          right: '6%',
          bottom: '6%',
          width: 60,
          height: 60,
          zIndex: 1000,
          backgroundColor: '#000',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather name="edit-2" color={'white'} size={25} />
      </TouchableOpacity>
    </View>
  );
}
