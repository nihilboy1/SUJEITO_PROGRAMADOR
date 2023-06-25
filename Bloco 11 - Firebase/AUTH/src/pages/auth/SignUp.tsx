import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useAuthContext} from '../../hooks/useAuthContext';
import {AppNavigatorAuthRoutesProps} from '../../routes/AuthRoutes';

export type onSubmitType = {
  email: string;
  password: string;
};

export function SignUp() {
  const {navigate} = useNavigation<AppNavigatorAuthRoutesProps>();
  const {signUp, userIsLoggedIn, user} = useAuthContext();

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

  async function onSubmit({email, password}: onSubmitType) {
    await signUp(email, password);
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
      <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
      <TouchableOpacity
        style={{marginTop: 20, backgroundColor: 'blue', padding: 10}}
        onPress={() => navigate('signIn')}>
        <Text style={{textAlign: 'center', color: 'white'}}>
          Move to SignIn
        </Text>
      </TouchableOpacity>
      {userIsLoggedIn && (
        <View>
          <Text>Usuário logado: {user.email}</Text>
        </View>
      )}
    </View>
  );
}
