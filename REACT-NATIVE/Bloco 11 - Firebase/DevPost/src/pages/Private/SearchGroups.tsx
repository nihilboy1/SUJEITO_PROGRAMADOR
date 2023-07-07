import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';
import devGroupLogoDark from '../../assets/devGroupLogoDark.png';

import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import {firebaseGetUsersByName} from '../../connection/database';
import {GroupsStackPrivateRoutesProps} from '../../routes/private.stack.groups.routes';
import {colors, fonts} from '../../theme/theme';
import {userDTO} from '../../types/userDTO';

export function SearchGroups() {
  const {navigate, goBack} = useNavigation<GroupsStackPrivateRoutesProps>();
  const [userName, setUserName] = useState('');
  const [searchedUsers, setSearchedUsers] = useState<userDTO[]>([]);

  useEffect(() => {
    if (userName === '' || userName === undefined) {
      setSearchedUsers([]);
      return;
    }
    const sub = firebaseGetUsersByName(userName, setSearchedUsers);
    return () => sub();
  }, [userName]);

  useFocusEffect(
    useCallback(() => {
      setUserName('');
      setSearchedUsers([]);
    }, []),
  );
  return (
    <View style={S.container}>
      <Animatable.View animation="fadeInDown" style={S.header}>
        <Pressable style={S.buttonBack} onPress={() => goBack()}>
          <Feather name="chevron-left" size={32} color={colors.text} />
        </Pressable>
        <Image source={devGroupLogoDark} />

        <Feather name="chevron-left" size={32} color={colors.background} />
      </Animatable.View>
      <View style={S.searchContainer}>
        <Feather name="search" size={32} color={colors.black} />
        <TextInput
          placeholder="Search for groups"
          placeholderTextColor={colors.text}
          style={S.inputText}
          onChangeText={value => {
            setUserName(value);
          }}
          value={userName}
        />
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  userSearchedButton: {
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: colors.info,
    borderRadius: 5,
    justifyContent: 'center',
  },

  buttonBack: {
    backgroundColor: colors.info,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 8,
    paddingRight: 10,
  },

  header: {
    width: '100%',
    padding: 10,
    paddingTop: 0,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userSearchedButtonText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.background,
    padding: 15,
    flex: 1,
    borderWidth: 1,
  },
  searchContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.primary,
    fontFamily: fonts.regular,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },

  inputText: {
    fontSize: 18,
    color: colors.text,
    marginLeft: 10,
  },
});
