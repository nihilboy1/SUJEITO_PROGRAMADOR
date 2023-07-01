import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import defaultAvatarImg from '../../assets/avatar.png';
import {useAuthContext} from '../../hooks/useAuthContext';
import {colors} from '../../theme/theme';

export function Profile() {
  const {signOut, user} = useAuthContext();
  if (!user?.name) {
    return;
  }
  return (
    <View style={S.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image source={defaultAvatarImg} style={S.avatarImage} />
      </TouchableOpacity>
      <Text style={S.userNameText}>{user.name}</Text>
      <Text style={S.userEmailText}>{user.email}</Text>

      <TouchableOpacity style={S.updateProfileButton} onPress={() => {}}>
        <Text style={S.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={S.signOutButton} onPress={() => signOut()}>
        <Text style={S.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const S = StyleSheet.create({
  signOutButton: {
    backgroundColor: colors.lightRed,
    borderRadius: 10,
    padding: 12,
    marginTop: 25,
  },

  updateProfileButton: {
    backgroundColor: colors.lightBlue,
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
    marginTop: 25,
    width: 150,
    height: 150,
  },
});
