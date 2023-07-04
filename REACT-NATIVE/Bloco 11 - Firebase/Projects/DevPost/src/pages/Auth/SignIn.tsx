import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import devPostLogoDark from '../../assets/devPostLogoDark.png';

import {useAuthContext} from '../../hooks/useAuthContext';
import {StackAuthRoutesProps} from '../../routes/auth.routes';
import {colors, fonts} from '../../theme/theme';

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
      <Animatable.View animation="fadeInDown" style={S.header}>
        <Image source={devPostLogoDark} />
        <TouchableOpacity
          onPress={() => {
            navigate('signUp');
          }}>
          <Text style={S.moveToSignUpText}>Sign Up</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Text
        style={{
          alignSelf: 'flex-start',
          color: colors.text,
          fontFamily: fonts.medium,
          marginLeft: 2,
          fontSize: 25,
        }}>
        Sign In
      </Text>
      <Animatable.View animation="fadeInLeft" style={S.inputBox}>
        <Text style={S.inputLabelText}>Email</Text>
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={value => {
            setEmail(value);
          }}
          style={S.textInput}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInLeft" style={S.inputBox}>
        <Text style={S.inputLabelText}>Password</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={value => {
            setPassword(value);
          }}
          style={S.textInput}
        />
      </Animatable.View>

      <View>
        {isAuthLoading ? (
          <TouchableOpacity
            style={S.signInButton}
            onPress={handleSignIn}
            disabled>
            <ActivityIndicator color={colors.background} size={38} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={S.signInButton} onPress={handleSignIn}>
            <Text style={S.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    padding: 10,
    gap: 50,
  },

  inputBox: {
    width: '100%',
  },

  inputLabelText: {
    marginLeft: 3,
    color: colors.info,
  },

  textInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    fontFamily: fonts.regular,
    borderBottomColor: colors.info,
    color: colors.text,
    borderBottomRightRadius: 25,
  },

  signInButton: {
    borderRadius: 15,
    height: 60,
    padding: 10,
    width: 320,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: colors.text,
    borderColor: colors.background,
  },

  moveToSignUpText: {
    color: colors.text,
    fontSize: 20,
    fontFamily: fonts.mono,
  },

  signInButtonText: {
    color: colors.background,
    fontFamily: fonts.regular,
    fontSize: 24,
    textAlign: 'center',
  },

  header: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
