import {StyleSheet, Text, View} from 'react-native';

export function Tela4() {
  return (
    <View style={S.container}>
      <Text>TELA 4</Text>
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
