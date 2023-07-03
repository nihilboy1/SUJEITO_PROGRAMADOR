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
import * as Animatable from 'react-native-animatable';
import {useAuthContext} from '../../hooks/useAuthContext';
import {StackAuthRoutesProps} from '../../routes/auth.routes';
import {colors} from '../../theme/theme';

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
    <ScrollView contentContainerStyle={S.container}>
      <Animatable.Text animation="bounceIn" style={S.title}>
        Feed APP
      </Animatable.Text>
      <TextInput
        placeholderTextColor={colors.gray}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        style={S.emailInput}
        placeholder="Email"
      />
      <TextInput
        onSubmitEditing={handleSignIn}
        placeholderTextColor={colors.gray}
        value={password}
        secureTextEntry
        onChangeText={value => {
          setPassword(value);
        }}
        style={S.passwordInput}
        placeholder="Password"
      />

      <View>
        {isAuthLoading ? (
          <TouchableOpacity
            style={S.signInButton}
            onPress={handleSignIn}
            disabled>
            <ActivityIndicator color={colors.black} size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={S.signInButton} onPress={handleSignIn}>
            <Text style={S.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={S.moveToSignUp}
        onPress={() => {
          navigate('signUp');
        }}>
        <Text style={S.moveToSignUpText}>Create account</Text>
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

  emailInput: {
    fontSize: 20,
    backgroundColor: colors.lightBlue,
    fontWeight: 'bold',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.white,
    paddingLeft: 15,
    width: '90%',
    borderRadius: 15,
  },

  passwordInput: {
    fontSize: 20,
    backgroundColor: colors.lightBlue,
    fontWeight: 'bold',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.white,
    paddingLeft: 15,
    width: '90%',
    borderRadius: 15,
  },

  signInButton: {
    backgroundColor: colors.lightBlue,
    borderRadius: 15,
    padding: 10,
    width: 130,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.white,
  },

  moveToSignUp: {
    backgroundColor: colors.darkGreen,
    borderRadius: 15,
    padding: 10,
    width: 200,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.white,
  },

  moveToSignUpText: {
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
    fontSize: 50,
    color: colors.lightBlue,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    marginTop: 45,
  },
});
