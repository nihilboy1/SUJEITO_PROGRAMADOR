import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../theme/theme';

type NewPostModalProps = {
  modalVisible: boolean;
  posting: boolean;
  postPlaceholder: string;
  handlefirebaseAddPost: () => void;
  setModalVisible: (value: boolean) => void;
  setPostText: (value: string) => void;
};

export function NewPostModal({
  modalVisible,
  setModalVisible,
  setPostText,
  handlefirebaseAddPost,
  postPlaceholder,
  posting,
}: NewPostModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={S.centeredView}>
        <View style={S.modalView}>
          <View style={S.modalHeader}>
            <Text />
            <View style={S.modalHeaderTitle}>
              <Text style={S.modalText}>Add a new post</Text>
              <Feather name="coffee" size={32} color={colors.black} />
            </View>
            <Pressable
              style={S.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={S.textStyle}>X</Text>
            </Pressable>
          </View>
          <TextInput
            textAlignVertical="top"
            multiline
            autoCorrect={false}
            maxLength={140}
            placeholder={postPlaceholder}
            style={S.input}
            placeholderTextColor={colors.gray}
            onChangeText={value => {
              setPostText(value);
            }}
          />
          {posting ? (
            <ActivityIndicator />
          ) : (
            <Pressable style={S.sendPostButton} onPress={handlefirebaseAddPost}>
              <Text style={S.textStyle}>Post it up</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

const S = StyleSheet.create({
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
  },
  input: {
    marginTop: 12,
    color: 'black',
    fontSize: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,

    height: 150,
    width: '100%',
  },
  modalView: {
    width: '95%',
    height: 310,
    margin: 20,
    backgroundColor: colors.lightBlue,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  buttonClose: {
    backgroundColor: colors.lightRed,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 8,
  },
  textStyle: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  sendPostButton: {
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 15,
    elevation: 2,
  },

  modalText: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
    marginLeft: 35,
    marginRight: 5,
    marginTop: 4,
  },
});
