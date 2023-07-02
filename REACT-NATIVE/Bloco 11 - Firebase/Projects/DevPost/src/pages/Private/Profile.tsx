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
import Feather from 'react-native-vector-icons/Feather';
import defaultAvatarImg from '../../assets/avatar.png';
import {
  firebaseGetUser,
  firebaseUpdateUserName,
} from '../../connection/database';
import {useAuthContext} from '../../hooks/useAuthContext';
import {localStorageSetUser} from '../../storage/userStorage';
import {colors} from '../../theme/theme';
import {userDTO} from '../../types/userDTO';

export function Profile() {
  const {signOut, user, setUser} = useAuthContext();
  if (!user?.name) {
    return;
  }
  const [updatingUser, setUpdatingUser] = useState(false);
  const [name, setName] = useState<string>(user.name);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [enabledButton, setEnabledButton] = useState<boolean>(false);

  async function handleFirebaseUpdateUserName() {
    try {
      setUpdatingUser(true);
      if (user?.uid) {
        await firebaseUpdateUserName(name, user.uid);
        const response = await firebaseGetUser(user.uid);
        if (response !== undefined) {
          const user = {
            uid: response.uid,
            name: response.name,
            nameInsensitive: response.nameInsensitive,
            email: response.email,
            timeStamp: response.timeStamp,
          } as userDTO;
          await localStorageSetUser(user);
          setUser(user);
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setUpdatingUser(false);
      setEnabledButton(false);
    }
  }

  useEffect(() => {
    if (user?.name == name || name == '') {
      setEnabledButton(false);
      return;
    } else {
      setEnabledButton(true);
    }
  }, [name]);

  useFocusEffect(
    useCallback(() => {
      setName(user.name);
    }, [user]),
  );

  return (
    <ScrollView contentContainerStyle={S.container}>
      <Text style={S.userEmailText}>{user.email}</Text>

      <TouchableOpacity
        onPress={() => {}}
        style={[
          S.uploadAvatarButton,
          !avatarUrl
            ? {borderTopLeftRadius: 5, borderColor: colors.darkBlue}
            : {borderColor: colors.black},
        ]}>
        {!avatarUrl ? (
          <View style={S.uploadAvatarIcon}>
            <Feather name="file-plus" size={28} color={colors.white} />
          </View>
        ) : null}
        <Image
          source={!avatarUrl ? defaultAvatarImg : {uri: avatarUrl}}
          style={[S.avatarImage, !avatarUrl ? {} : {borderColor: colors.white}]}
        />
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
          value={name}
          onChangeText={value => {
            setName(value);
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
        disabled={!enabledButton}
        style={[
          S.updateProfileButton,
          !enabledButton ? {opacity: 0.3} : {opacity: 1},
        ]}
        onPress={handleFirebaseUpdateUserName}>
        {updatingUser ? (
          <ActivityIndicator color={colors.black} size={30} />
        ) : (
          <Text style={S.buttonText}>Save changes</Text>
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

  uploadAvatarIcon: {
    position: 'absolute',
    backgroundColor: colors.darkBlue,
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
    color: colors.black,
    backgroundColor: colors.white,
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
