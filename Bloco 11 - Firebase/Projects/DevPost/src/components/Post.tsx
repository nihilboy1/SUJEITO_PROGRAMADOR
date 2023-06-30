import {useNavigation} from '@react-navigation/native';
import {formatDistance} from 'date-fns';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import defaultAvatarImg from '../assets/avatar.png';
import {firebaseUpdateUsersWhoLikedAPost} from '../connection/database';
import {useAuthContext} from '../hooks/useAuthContext';
import {StackPrivateRoutesProps} from '../routes/private.stack.routes';
import {colors} from '../theme/theme';
import {postDTO} from '../types/postDTO';

type PostProps = {
  postData: postDTO;
};

export function Post({postData}: PostProps) {
  const {user} = useAuthContext();
  const {navigate} = useNavigation<StackPrivateRoutesProps>();
  const [usersWhoLiked, setUsersWhoLiked] = useState<string[]>(
    postData.usersWhoLiked,
  );

  if (!user?.uid) {
    return null;
  }
  const currentUserId = user.uid;
  const uid = postData.uid;
  const name = postData.author;

  const likedByCurrentUser = usersWhoLiked.includes(currentUserId)
    ? 'heart'
    : 'hearto';
  async function handleFirebaseUpdateUsersWhoLikedAPost(id: string) {
    if (!usersWhoLiked.includes(currentUserId)) {
      setUsersWhoLiked(currentUsersWhoLiked => {
        const updatedUsersWhoLiked = [...currentUsersWhoLiked, currentUserId];
        firebaseUpdateUsersWhoLikedAPost(id, updatedUsersWhoLiked);
        return updatedUsersWhoLiked;
      });
    } else {
      const usersWhoLikedWithoutTheCurrentUser = usersWhoLiked.filter(
        userId => {
          return userId !== currentUserId;
        },
      );
      setUsersWhoLiked(usersWhoLikedWithoutTheCurrentUser);
      firebaseUpdateUsersWhoLikedAPost(id, usersWhoLikedWithoutTheCurrentUser);
    }
  }

  function formatDate(timeStamp: number) {
    const postDate = new Date(timeStamp);
    return formatDistance(new Date(), postDate, {
      /* Poderia aqui passar o Locale PT-BR, mas optei por deixar tudo em inglês*/
    });
  }

  return (
    <View style={S.container}>
      <TouchableOpacity
        onPress={() => {
          navigate('userposts', {uid, name});
        }}
        style={S.navigateButton}>
        <Image
          source={
            postData.avatarUrl ? {uri: postData.avatarUrl} : defaultAvatarImg
          }
          style={S.avatar}
        />
        <Text style={S.author}>{postData.author}</Text>
      </TouchableOpacity>
      <Text style={S.content}>{postData.content}</Text>
      <View style={S.footerContainer}>
        {usersWhoLiked.length > 0 ? (
          <View style={S.footerInnerContainer}>
            <Text style={S.likesAmount}>{usersWhoLiked.length}</Text>
            <TouchableOpacity
              onPress={() => {
                handleFirebaseUpdateUsersWhoLikedAPost(postData.id);
              }}>
              <AntDesign
                name={likedByCurrentUser}
                size={25}
                color={colors.darkGreen}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={S.footerInnerContainer}>
            <Text style={S.beTheFirstToLike}>Be the first to like </Text>
            <TouchableOpacity
              onPress={() => {
                handleFirebaseUpdateUsersWhoLikedAPost(postData.id);
              }}>
              <AntDesign
                name={likedByCurrentUser}
                size={25}
                color={colors.darkGreen}
              />
            </TouchableOpacity>
          </View>
        )}
        <Text style={S.time}>{formatDate(postData.timeStamp)}</Text>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    height: 230,
    marginBottom: 15,
    borderRadius: 5,
    padding: 15,
    backgroundColor: colors.white,
  },

  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.darkGreen,
    borderRadius: 50,
  },

  avatar: {width: 55, height: 55, borderRadius: 99},

  author: {fontSize: 18, fontWeight: 'bold', color: colors.black},

  content: {
    fontSize: 18,
    height: 100,
    fontWeight: 'bold',
    color: colors.gray,
    marginTop: 10,
    marginBottom: 10,
  },

  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  footerInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likesAmount: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 4,
  },

  beTheFirstToLike: {
    color: colors.black,
    fontSize: 16,
    marginRight: 5,
    marginBottom: 4,
  },

  time: {fontSize: 17, color: colors.gray},
});
