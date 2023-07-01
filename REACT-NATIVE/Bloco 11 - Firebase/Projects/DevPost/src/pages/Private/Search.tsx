import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {firebaseGetUsersByName} from '../../connection/database';
import {StackPrivateRoutesProps} from '../../routes/private.stack.routes';
import {colors} from '../../theme/theme';
import {userDTO} from '../../types/userDTO';

export function Search() {
  const {navigate} = useNavigation<StackPrivateRoutesProps>();
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
      <View style={S.searchContainer}>
        <Feather name="search" size={32} color={colors.black} />
        <TextInput
          placeholder="Searching for someone?"
          placeholderTextColor={colors.gray}
          style={S.inputText}
          onChangeText={value => {
            setUserName(value);
          }}
          value={userName}
        />
      </View>
      <FlatList
        data={searchedUsers}
        keyExtractor={item => item.uid}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={S.userSearchedButton}
              onPress={() => {
                navigate('userposts', {name: item.name, uid: item.uid});
              }}>
              <Text style={S.userSearchedButtonText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const S = StyleSheet.create({
  userSearchedButton: {
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
    justifyContent: 'center',
  },

  userSearchedButtonText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.black,
    padding: 15,
    flex: 1,
    borderWidth: 1,
  },
  searchContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },

  inputText: {
    fontSize: 18,
    color: colors.black,
    marginLeft: 10,
  },
});
