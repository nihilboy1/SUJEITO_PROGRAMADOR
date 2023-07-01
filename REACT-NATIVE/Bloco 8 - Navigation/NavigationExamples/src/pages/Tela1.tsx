import {StyleSheet, Text, View} from 'react-native';

export function Tela1() {
  return (
    <View style={S.container}>
      <Text>TELA 1</Text>
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
