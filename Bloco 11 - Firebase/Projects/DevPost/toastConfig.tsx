import {InfoToast, ToastProps} from 'react-native-toast-message';

export const toastConfig = {
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      style={{borderLeftColor: 'grey'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
      }}
    />
  ),
};
