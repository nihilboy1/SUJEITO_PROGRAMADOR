import {Button, Text, View} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';

export function Profile() {
  const {signOut} = useAuthContext();
  return (
    <View>
      <Text>Profile</Text>
      <Button title="SIGN-OUT" onPress={signOut} />
    </View>
  );
}
