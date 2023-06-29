import {useNavigation} from '@react-navigation/native';
import {formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import defaultAvatarImg from '../assets/avatar.png';
import {firebaseUpdateUsersWhoLikedAPost} from '../connection/database';
import {useAuthContext} from '../hooks/useAuthContext';
import {StackPrivateRoutesProps} from '../routes/private.stack.routes';
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
  const uid = user.uid;
  const name = user.name;

  const likedByCurrentUser = usersWhoLiked.includes(user.uid)
    ? 'heart'
    : 'hearto';
  async function handleFirebaseUpdateUsersWhoLikedAPost(id: string) {
    if (!usersWhoLiked.includes(uid)) {
      setUsersWhoLiked(currentUsersWhoLiked => {
        const updatedUsersWhoLiked = [...currentUsersWhoLiked, uid];
        firebaseUpdateUsersWhoLikedAPost(id, updatedUsersWhoLiked);
        return updatedUsersWhoLiked;
      });
    } else {
      const usersWhoLikedWithoutTheCurrentUser = usersWhoLiked.filter(
        userId => {
          return userId !== uid;
        },
      );
      setUsersWhoLiked(usersWhoLikedWithoutTheCurrentUser);
      firebaseUpdateUsersWhoLikedAPost(id, usersWhoLikedWithoutTheCurrentUser);
    }
  }

  function formatDate(timeStamp: number) {
    const postDate = new Date(timeStamp);
    return formatDistance(new Date(), postDate, {
      locale: ptBR,
    });
  }

  return (
    <View
      style={{
        height: 230,
        marginBottom: 15,
        borderRadius: 5,
        padding: 15,
        backgroundColor: 'white',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigate('userposts', {uid, name});
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: 'grey',
          borderRadius: 50,
        }}>
        <Image
          source={
            postData.avatarUrl ? {uri: postData.avatarUrl} : defaultAvatarImg
          }
          style={{width: 55, height: 55, borderRadius: 99}}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {postData.author}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {postData.content}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {usersWhoLiked.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#e52246',
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: 5,
                marginBottom: 4,
              }}>
              {usersWhoLiked.length}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleFirebaseUpdateUsersWhoLikedAPost(postData.id);
              }}>
              <AntDesign name={likedByCurrentUser} size={25} color="#e52246" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleFirebaseUpdateUsersWhoLikedAPost(postData.id);
            }}>
            <AntDesign name={likedByCurrentUser} size={25} color="#e52246" />
          </TouchableOpacity>
        )}
        <Text style={{fontSize: 17}}>{formatDate(postData.timeStamp)}</Text>
      </View>
    </View>
  );
}
