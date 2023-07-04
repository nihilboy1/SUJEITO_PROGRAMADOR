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

import Toast from 'react-native-toast-message';
import {useAuthContext} from '../../hooks/useAuthContext';
import {StackAuthRoutesProps} from '../../routes/auth.routes';
import {colors, fonts} from '../../theme/theme';

export function SignUp() {
  const {navigate} = useNavigation<StackAuthRoutesProps>();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {signUp, isAuthLoading} = useAuthContext();

  async function handleSignUp() {
    if (email === '' || password === '' || name === '') {
      Toast.show({
        type: 'info',
        text1: 'There are empty fields',
        position: 'top',
      });
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
      <Animatable.View animation="fadeInDown" style={S.header}>
        <Image source={devPostLogoDark} />
        <TouchableOpacity
          onPress={() => {
            navigate('signIn');
          }}>
          <Text style={S.moveToLogin}>Sign In</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.Text
        animation="fadeInLeft"
        style={{
          alignSelf: 'flex-start',
          color: colors.text,
          fontFamily: fonts.medium,
          marginLeft: 2,
          fontSize: 25,
        }}>
        Sign Up
      </Animatable.Text>
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
        <Text style={S.inputLabelText}>Name</Text>
        <TextInput
          value={name}
          onChangeText={value => {
            setName(value);
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
            style={S.signUpButton}
            onPress={handleSignUp}
            disabled>
            <ActivityIndicator color={colors.background} size={38} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={S.signUpButton} onPress={handleSignUp}>
            <Text style={S.signUpButtonText}>Sign Up</Text>
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

  signUpButton: {
    borderRadius: 15,
    height: 60,
    padding: 10,
    width: 320,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: colors.text,
    borderColor: colors.background,
  },

  moveToLogin: {
    color: colors.text,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.mono,
  },

  signUpButtonText: {
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
