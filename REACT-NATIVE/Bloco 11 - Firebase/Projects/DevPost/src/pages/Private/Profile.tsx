import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import defaultAvatarImg from '../../assets/avatar.png';
import {
  firebaseGetUser,
  firebaseUpdateUser,
  firebaseUpdateUserPosts,
} from '../../connection/database';
import {
  storageDeleteUserAvatar,
  storageDownloadUserAvatar,
  storageUploadUserAvatar,
} from '../../connection/storage';
import {useAuthContext} from '../../hooks/useAuthContext';
import {localStorageSetUser} from '../../storage/userStorage';
import {colors} from '../../theme/theme';
import {userDTO} from '../../types/userDTO';

export function Profile() {
  const {signOut, user, setUser} = useAuthContext();
  if (!user?.uid) {
    return;
  }
  const [updatingUserName, setUpdatingUserName] = useState(false);
  const [updatingUserAvatarUrl, setUpdatingUserAvatarUrl] = useState(false);

  const [oldName, setOldName] = useState(user.name);
  const [currentName, setCurrentName] = useState<string>(user.name);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatarUrl);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  async function handleUpdateUserName() {
    try {
      setUpdatingUserName(true);
      if (!user?.uid) {
        return;
      }
      await firebaseUpdateUser(
        {name: currentName, nameInsensitive: currentName.toUpperCase()},
        user.uid,
      );
      const response = await firebaseGetUser(user.uid);
      if (response !== undefined) {
        const user = {
          uid: response.uid,
          name: response.name,
          nameInsensitive: response.nameInsensitive,
          email: response.email,
          avatarUrl: response.avatarUrl,
          timeStamp: response.timeStamp,
        } as userDTO;
        await localStorageSetUser(user);
        setUser(user);
        setCurrentName(user.name);
        setOldName(user.name);
        await firebaseUpdateUserPosts({authorName: user.name}, user.uid);
      }
    } catch (error) {
      throw error;
    } finally {
      setUpdatingUserName(false);
      setDisabledButton(true);
    }
  }

  async function handleUpdateUserAvatarUrl() {
    try {
      setUpdatingUserAvatarUrl(true);
      if (!user?.uid) {
        return;
      }
      const res = await launchImageLibrary({mediaType: 'photo'});
      if (res.didCancel) {
        console.log('Upload cancelado');
      } else if (res.errorCode) {
        console.log('Erro ao realizar o upload');
      } else if (res.assets) {
        const filePath = res.assets[0].uri;
        if (filePath) {
          await storageUploadUserAvatar(filePath, user.uid);
          const avatarUri = await storageDownloadUserAvatar(user.uid);
          await firebaseUpdateUser({avatarUrl: avatarUri}, user.uid);
          const response = await firebaseGetUser(user.uid);
          if (response !== undefined) {
            const user = {
              uid: response.uid,
              name: response.name,
              nameInsensitive: response.nameInsensitive,
              email: response.email,
              avatarUrl: response.avatarUrl,
              timeStamp: response.timeStamp,
            } as userDTO;
            await localStorageSetUser(user);
            setUser(user);
            setAvatarUrl(user.avatarUrl);
            await firebaseUpdateUserPosts(
              {avatarUrl: user.avatarUrl},
              user.uid,
            );
          }
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setUpdatingUserAvatarUrl(false);
    }
  }

  async function handleRemoveUserAvatarUrl() {
    try {
      setUpdatingUserAvatarUrl(true);
      if (!user?.uid) {
        return;
      }
      await storageDeleteUserAvatar(user.uid);
      await firebaseUpdateUserPosts({avatarUrl: null}, user.uid);
      await firebaseUpdateUser({avatarUrl: null}, user.uid);
      const response = await firebaseGetUser(user.uid);
      if (response !== undefined) {
        const user = {
          uid: response.uid,
          name: response.name,
          nameInsensitive: response.nameInsensitive,
          email: response.email,
          avatarUrl: response.avatarUrl,
          timeStamp: response.timeStamp,
        } as userDTO;
        await localStorageSetUser(user);
        setUser(user);
        setAvatarUrl(user.avatarUrl);
      }
    } catch (error) {
    } finally {
      setUpdatingUserAvatarUrl(false);
    }
  }

  useEffect(() => {
    if (currentName === '' || currentName === oldName) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [currentName]);

  useFocusEffect(
    useCallback(() => {
      setCurrentName(user.name);
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={S.container}>
      <Text style={S.userEmailText}>{user.email}</Text>
      <TouchableOpacity
        onPress={handleUpdateUserAvatarUrl}
        style={[
          S.uploadAvatarButton,
          !avatarUrl ? {} : {borderTopRightRadius: 5},
        ]}>
        {avatarUrl ? (
          <>
            <View style={S.uploadAvatarIconBox1}>
              <Feather name="edit" size={28} color={colors.white} />
            </View>
            <TouchableOpacity
              style={S.uploadAvatarIconBox2}
              onPress={handleRemoveUserAvatarUrl}>
              <Feather name="x" size={28} color={colors.lightRed} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={S.uploadAvatarIconBox1}>
            <Feather name="file-plus" size={28} color={colors.white} />
          </View>
        )}
        {updatingUserAvatarUrl ? (
          <ActivityIndicator
            style={{padding: 50}}
            color={colors.white}
            size={50}
          />
        ) : (
          <Image
            source={!avatarUrl ? defaultAvatarImg : {uri: avatarUrl}}
            style={[
              S.avatarImage,
              !avatarUrl ? {} : {borderColor: colors.white},
            ]}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.darkBlue,
          padding: 5,
        }}>
        <TextInput
          style={S.userNameText}
          maxLength={15}
          value={currentName}
          onChangeText={value => {
            setCurrentName(value);
          }}
        />
        <View
          style={{
            backgroundColor: colors.darkBlue,
            padding: 4,
            borderRadius: 10,
          }}>
          <Feather name="edit" size={28} color={colors.white} />
        </View>
      </View>

      <TouchableOpacity
        disabled={disabledButton}
        style={[
          S.updateProfileButton,
          disabledButton ? {opacity: 0.3} : {opacity: 1},
        ]}
        onPress={handleUpdateUserName}>
        {updatingUserName ? (
          <ActivityIndicator color={colors.white} size={30} />
        ) : (
          <Text style={S.buttonText}>Save Name</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={S.signOutButton} onPress={signOut}>
        <Text style={S.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const S = StyleSheet.create({
  signOutButton: {
    backgroundColor: colors.lightRed,
    borderRadius: 10,
    padding: 12,
    marginTop: 25,
  },

  uploadAvatarIconBox1: {
    position: 'absolute',
    backgroundColor: colors.darkBlue,
    padding: 4,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 5,
  },

  uploadAvatarIconBox2: {
    position: 'absolute',
    right: 5,
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 5,
  },

  uploadAvatarButton: {
    padding: 25,
    position: 'relative',
    marginTop: 25,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: colors.black,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderColor: colors.darkBlue,
  },

  updateProfileButton: {
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    padding: 12,
    marginTop: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  userNameText: {
    fontSize: 30,
    color: colors.white,
    backgroundColor: colors.black,
    height: 50,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 20,
  },
  userEmailText: {
    fontSize: 22,
    color: colors.white,
    fontStyle: 'italic',
    marginTop: 10,
  },
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  avatarImage: {
    borderRadius: 100,
    width: 150,
    height: 150,
    borderWidth: 2,
  },
});
