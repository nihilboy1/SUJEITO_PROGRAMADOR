import {Button, Text, View} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';

export function Profile() {
  const {signOut, user} = useAuthContext();
  return (
    <View>
      <Text>{user?.name}</Text>
      <Button title="SIGN-OUT" onPress={signOut} />
    </View>
  );
}
