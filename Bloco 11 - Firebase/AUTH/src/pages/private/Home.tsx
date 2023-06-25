import {Text, View} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';

export function Home() {
  const {user} = useAuthContext();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 25, color: 'black'}}>Home</Text>
      <Text style={{fontSize: 18, color: 'black'}}>{user.email}</Text>
    </View>
  );
}
