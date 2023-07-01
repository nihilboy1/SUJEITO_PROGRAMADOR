import {StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../theme/theme';

type NewPostWidgetProps = {
  setModalVisible: (value: boolean) => void;
};

export function NewPostWidget({setModalVisible}: NewPostWidgetProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      style={S.button}>
      <Feather name="edit-2" color={colors.black} size={25} />
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  button: {
    position: 'absolute',
    right: '6%',
    bottom: '6%',
    width: 60,
    height: 60,
    zIndex: 1000,
    backgroundColor: colors.lightBlue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
