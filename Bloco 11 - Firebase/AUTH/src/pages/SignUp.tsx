import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, View} from 'react-native';
import {useAuthContext} from '../hooks/useAuthContext';
import {AppNavigatorAuthRoutesProps} from '../routes/AuthRoutes';

export function SignUp() {
  const {navigate} = useNavigation<AppNavigatorAuthRoutesProps>();
  const {handleSignUp} = useAuthContext();

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

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <View style={{flex: 1}}>
      <Controller
        name="email"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, value}}) => (
          <TextInput
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
            placeholder="password"
            keyboardType="visible-password"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text>This is required.</Text>}
      <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
