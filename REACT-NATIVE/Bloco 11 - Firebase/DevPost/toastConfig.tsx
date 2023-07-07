import {InfoToast, ToastProps} from 'react-native-toast-message';
import {colors, fonts} from './src/theme/theme';

export const toastConfig = {
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      style={{
        backgroundColor: colors.info,
        borderWidth: 1,
        borderColor: colors.info,
        borderLeftColor: colors.danger,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontFamily: fonts.mono,
        fontSize: 18,
        color: colors.text,
        fontWeight: '400',
      }}
    />
  ),
};
