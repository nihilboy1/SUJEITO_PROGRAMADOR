import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';
import {StackAuthRoutesProps} from '../../routes/auth.routes';
export function SignIn() {
  const {navigate} = useNavigation<StackAuthRoutesProps>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {signIn, isAuthLoading} = useAuthContext();

  async function handleSignIn() {
    if (email === '' || password === '') {
      Alert.alert('Existem campos vazios');
      return;
    }
    await signIn(email, password);
  }

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Entrar no APP</Text>
      <TextInput
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          borderWidth: 1,
          width: '90%',
        }}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={value => {
          setPassword(value);
        }}
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          borderWidth: 1,
          width: '90%',
        }}
        placeholder="Password"
      />

      <View>
        {isAuthLoading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Entrar no App" color="red" onPress={handleSignIn} />
        )}
      </View>
      <Button
        title="Ir para Sign-Up"
        color="blue"
        onPress={() => navigate('signUp')}
      />
    </View>
  );
}
