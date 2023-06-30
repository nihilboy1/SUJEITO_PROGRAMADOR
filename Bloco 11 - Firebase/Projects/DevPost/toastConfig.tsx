import {InfoToast, ToastProps} from 'react-native-toast-message';
import {colors} from './src/theme/theme';

export const toastConfig = {
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      style={{borderLeftColor: colors.lightGreen}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
      }}
    />
  ),
};
