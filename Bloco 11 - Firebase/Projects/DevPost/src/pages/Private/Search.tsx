import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export function Search() {
  return (
    <View style={S.container}>
      <View style={S.searchContainer}>
        <Feather name="search" size={20} color="#E52246" />
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
    borderWidth: 1,
  },
  searchContainer: {
    borderWidth: 1,
  },
});
