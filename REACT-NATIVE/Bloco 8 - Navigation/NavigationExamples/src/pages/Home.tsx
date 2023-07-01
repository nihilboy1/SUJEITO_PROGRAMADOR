import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AppNavigatorStackRoutesProps} from '../routes/StackRoutes';

export function Home() {
  const navigation = useNavigation<AppNavigatorStackRoutesProps>();
  return (
    <View style={S.container}>
      <Text>HOME</Text>
      <Button
        title="Move to About"
        onPress={() => navigation.navigate('about')}
      />
      <Button
        title="Move to TELA 3"
        onPress={() => navigation.navigate('drawerRoutes')}
      />
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
