import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';
import {StackAuthRoutesProps} from '../../routes/auth.routes';

export function SignUp() {
  const {navigate} = useNavigation<StackAuthRoutesProps>();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {signUp, isAuthLoading} = useAuthContext();

  async function handleSignUp() {
    if (email === '' || password === '' || name === '') {
      Alert.alert('Existem campos vazios');
      return;
    }
    await signUp(email, password, name);
    Alert.alert('Usuário cadastrado com sucesso');
    setEmail('');
    setName('');
    setPassword('');
  }
  return (
    <View style={S.container}>
      <Text style={S.title}>Criar Conta</Text>
      <TextInput
        value={name}
        onChangeText={value => {
          setName(value);
        }}
        style={S.nameInput}
        placeholder="Name"
      />
      <TextInput
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        style={S.emailInput}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={value => {
          setPassword(value);
        }}
        style={S.passwordInput}
        placeholder="Password"
      />
      <View>
        {isAuthLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Criar Conta e Entrar"
            color="blue"
            onPress={handleSignUp}
          />
        )}
      </View>
      <Button
        title="Voltar para Sign-In"
        color="red"
        onPress={() => navigate('signIn')}
      />
    </View>
  );
}

const S = StyleSheet.create({
  container: {alignItems: 'center', flex: 1, justifyContent: 'space-around'},
  title: {fontSize: 20, fontWeight: 'bold'},
  nameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    width: '90%',
  },
  emailInput: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    width: '90%',
  },

  passwordInput: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    width: '90%',
  },
});
