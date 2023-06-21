import {StyleSheet, Text, View} from 'react-native';

export function About() {
  return (
    <View style={S.container}>
      <Text>ABOUT</Text>
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
