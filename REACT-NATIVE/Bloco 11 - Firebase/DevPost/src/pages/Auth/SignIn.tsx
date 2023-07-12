import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import devPostLogoDark from '../../assets/devPostLogoDark.png';

import {SafeAreaView} from 'react-native-safe-area-context';
import {showToast} from '../../../toastConfig';
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

  useFocusEffect(
    useCallback(() => {
      showToast('success', 'bottom', 'texto');
    }, []),
  );

  return (
    <SafeAreaView style={S.container}>
      <View style={S.header}>
        <Image source={devPostLogoDark} />
        <TouchableOpacity
          onPress={() => {
            navigate('signUp');
          }}>
          <Text style={S.moveToSignUpText}>Create account</Text>
        </TouchableOpacity>
      </View>
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
      <View style={S.inputBox}>
        <Text style={S.inputLabelText}>Email</Text>
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={value => {
            setEmail(value);
          }}
          style={S.textInput}
        />
      </View>
      <View style={S.inputBox}>
        <Text style={S.inputLabelText}>Password</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={value => {
            setPassword(value);
          }}
          style={S.textInput}
        />
      </View>
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
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexGrow: 1,
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
