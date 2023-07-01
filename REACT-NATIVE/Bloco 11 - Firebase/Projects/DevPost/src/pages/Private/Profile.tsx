import {useEffect, useState} from 'react';
import {
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
import {useAuthContext} from '../../hooks/useAuthContext';
import {colors} from '../../theme/theme';

export function Profile() {
  const {signOut, user} = useAuthContext();
  if (!user?.name) {
    return;
  }
  const [name, setName] = useState<string>(user.name);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [enabledButton, setEnabledButton] = useState<boolean>(false);

  async function handleFirebaseUpdateUserName() {}

  useEffect(() => {
    if (user?.name == name || name == '') {
      setEnabledButton(false);
      return;
    } else {
      setEnabledButton(true);
    }
  }, [name]);

  return (
    <ScrollView contentContainerStyle={S.container}>
      <TouchableOpacity
        onPress={() => {}}
        style={[
          S.uploadAvatarButton,
          !avatarUrl
            ? {borderTopLeftRadius: 5, backgroundColor: colors.darkBlue}
            : {backgroundColor: colors.black},
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
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
            padding: 5,
            borderRadius: 10,
          }}>
          <Feather name="edit" size={28} color={colors.white} />
        </View>
      </View>
      <Text style={S.userEmailText}>{user.email}</Text>

      <TouchableOpacity
        disabled={!enabledButton}
        style={[
          S.updateProfileButton,
          !enabledButton ? {opacity: 0.3} : {opacity: 1},
        ]}
        onPress={() => {}}>
        <Text style={S.buttonText}>Save changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={S.signOutButton} onPress={() => {}}>
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
    padding: 5,
    borderRadius: 10,
    marginLeft: 3,
    marginTop: 3,
  },

  uploadAvatarButton: {
    padding: 18,
    position: 'relative',
    marginTop: 25,
    borderRadius: 100,
    marginBottom: 20,
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
