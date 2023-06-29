import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ActivityIndicator, Alert, Button, TextInput, View} from 'react-native';
import {remoteDatabaseAddPost} from '../../connection/database';
import {remoteStorageDownloadFile} from '../../connection/storage';
import {useAuthContext} from '../../hooks/useAuthContext';

export function NewPost() {
  const [postText, setPostText] = useState('');
  const [posting, setPosting] = useState(false);
  const {goBack} = useNavigation();
  const {user} = useAuthContext();

  async function handleRemoteDatabaseAddPost() {
    try {
      setPosting(true);
      if (postText === '') {
        console.log('O post não pode estar vazio');
        return;
      }
      let avatarUrl = null;
      if (user?.uid) {
        const file = await remoteStorageDownloadFile('users', user.uid);
        if (file) {
          avatarUrl = file;
        }
        await remoteDatabaseAddPost(postText, user.name, user.uid, avatarUrl);
        setPostText('');
        goBack();
      }
    } catch (error) {
      console.log('Erro na função handleRemoteDatabaseAddPost');
    } finally {
      setPosting(false);
    }
  }
  return (
    <View>
      <TextInput
        multiline
        maxLength={200}
        placeholder="digite aqui o post"
        style={{color: 'black', fontSize: 25, marginBottom: 30}}
        placeholderTextColor={'grey'}
        onChangeText={value => {
          setPostText(value);
        }}
      />
      {posting ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Postar"
          color="blue"
          onPress={handleRemoteDatabaseAddPost}
        />
      )}
    </View>
  );
}
