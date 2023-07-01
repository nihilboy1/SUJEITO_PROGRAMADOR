import {StyleSheet, Text, View} from 'react-native';

export function Tela2() {
  return (
    <View style={S.container}>
      <Text>TELA 2</Text>
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
