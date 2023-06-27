import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {StackAuthRoutesProps} from '../../routes/auth.routes';

export function SignUp() {
  const {navigate} = useNavigation<StackAuthRoutesProps>();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSignUp() {
    if (email === '' || password === '' || name === '') {
      Alert.alert('Existem campos vazios');
      return;
    }
  }
  return (
    <View
      style={{alignItems: 'center', flex: 1, justifyContent: 'space-around'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Criar Conta</Text>
      <TextInput
        value={name}
        onChangeText={value => {
          setName(value);
        }}
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          borderWidth: 1,
          width: '90%',
        }}
        placeholder="Name"
      />
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
      <Button title="Criar Conta" color="blue" onPress={handleSignUp} />
      <Button
        title="Voltar para Sign-In"
        color="red"
        onPress={() => navigate('signIn')}
      />
    </View>
  );
}
