import {Button, TextInput, View} from 'react-native';
import {useAuthContext} from '../hooks/useAuthContext';

export function SignIn() {
  const {email, password, setEmail, setPassword, handleSignIn} =
    useAuthContext();

  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="email"
        keyboardType="email-address"
        onChangeText={value => setEmail(value)}
        value={email}
      />
      <TextInput
        placeholder="password"
        keyboardType="visible-password"
        onChangeText={value => setPassword(value)}
        value={password}
      />
      <Button title="Entrar" onPress={handleSignIn} />
    </View>
  );
}
