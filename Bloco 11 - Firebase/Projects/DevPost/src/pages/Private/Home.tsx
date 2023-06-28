import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import defaultAvatarImg from '../../assets/avatar.png';
import {remoteDatabaseGetPosts} from '../../connection/database';
import {useAuthContext} from '../../hooks/useAuthContext';
import {StackPrivateRoutesProps} from '../../routes/private.stack.routes';
import {postDTO} from '../../types/postDTO';

export function Home() {
  const {navigate} = useNavigation<StackPrivateRoutesProps>();
  const {user} = useAuthContext();
  const [posts, setPosts] = useState<postDTO[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useFocusEffect(
    useCallback(() => {
      try {
        setIsLoadingPosts(true);
        remoteDatabaseGetPosts().then(postsList => {
          if (postsList !== undefined) {
            setPosts(postsList);
          }
        });
      } catch (error) {
      } finally {
        setIsLoadingPosts(false);
      }
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
      {isLoadingPosts ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={50} color="blue" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <View
              style={{
                height: 230,
                marginBottom: 15,
                borderRadius: 5,
                padding: 8,
                backgroundColor: 'white',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: 'grey',
                  borderRadius: 50,
                }}>
                <Image
                  source={defaultAvatarImg}
                  style={{width: 55, height: 55}}
                />
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {item.author}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginLeft: 20,
                }}>
                {item.content}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {item.likes > 0 ? (
                  <>
                    <Text style={{color: '#e52246'}}>{item.likes}</Text>
                    <MaterialCommunityIcons
                      name="heart-plus-outline"
                      size={20}
                      color="#e52246"
                    />
                  </>
                ) : (
                  <MaterialCommunityIcons
                    name="heart"
                    size={20}
                    color="#e52246"
                  />
                )}
              </View>
            </View>
          )}
        />
      )}
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
