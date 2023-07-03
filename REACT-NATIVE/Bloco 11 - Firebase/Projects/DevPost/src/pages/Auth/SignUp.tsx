import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';
import {StackAuthRoutesProps} from '../../routes/auth.routes';
import {colors} from '../../theme/theme';

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
    <ScrollView contentContainerStyle={S.container}>
      <Text style={S.title}>Create Account</Text>
      <TextInput
        placeholderTextColor={colors.gray}
        value={name}
        onChangeText={value => {
          setName(value);
        }}
        style={S.Input}
        placeholder="Name"
      />
      <TextInput
        placeholderTextColor={colors.gray}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        style={S.Input}
        placeholder="Email"
      />
      <TextInput
        placeholderTextColor={colors.gray}
        value={password}
        secureTextEntry
        onChangeText={value => {
          setPassword(value);
        }}
        style={S.Input}
        placeholder="Password"
      />

      <View>
        {isAuthLoading ? (
          <View style={S.signUpAndLoginButton}>
            <ActivityIndicator color={colors.lightBlue} size={30} />
          </View>
        ) : (
          <TouchableOpacity
            style={S.signUpAndLoginButton}
            onPress={handleSignUp}>
            <Text style={S.signInButtonText}>SignUp and Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={S.moveToSignIn}
        onPress={() => {
          navigate('signIn');
        }}>
        <Text style={S.moveToSignInText}>Go back to SignIn</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.black,
    flex: 1,
    gap: 50,
  },

  Input: {
    fontSize: 20,
    backgroundColor: colors.darkGreen,
    fontWeight: 'bold',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.white,
    paddingLeft: 15,
    width: '90%',
    borderRadius: 15,
  },

  signUpAndLoginButton: {
    backgroundColor: colors.darkGreen,
    borderRadius: 15,
    padding: 10,
    width: 240,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.white,
  },

  moveToSignIn: {
    backgroundColor: colors.lightBlue,
    borderRadius: 15,
    padding: 10,
    width: 230,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.white,
  },

  moveToSignInText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  signInButtonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },

  title: {
    fontSize: 30,
    color: colors.darkGreen,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    marginTop: 45,
  },
});
