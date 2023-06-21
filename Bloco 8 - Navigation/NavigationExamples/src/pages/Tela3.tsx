import {StyleSheet, Text, View} from 'react-native';

export function Tela3() {
  return (
    <View style={S.container}>
      <Text>TELA 3</Text>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
