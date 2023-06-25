import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, View} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';
import {onSubmitType} from './SignUp';
export function SignIn() {
  const {userIsLoggedIn, signIn, signOut, checkIfUserIsLoggedIn, user} =
    useAuthContext();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    async function handleCheckUserIsLoggedId() {
      await checkIfUserIsLoggedIn();
    }
    handleCheckUserIsLoggedId();
  }, []);

  async function onSubmit({email, password}: onSubmitType) {
    await signIn(email, password);
  }
  return (
    <View style={{flex: 1}}>
      <Controller
        name="email"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={{color: 'black'}}
            placeholderTextColor={'#000000'}
            placeholder="email"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        name="password"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={{color: 'black'}}
            placeholderTextColor={'#000000'}
            placeholder="password"
            keyboardType="visible-password"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text>This is required.</Text>}
      <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
      {userIsLoggedIn && (
        <View>
          <Text>Usuário logado: {user.email}</Text>
        </View>
      )}
    </View>
  );
}
