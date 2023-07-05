import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../theme/theme';

type NewGroupModalProps = {
  creatingNewGroup: boolean;
  modalVisible: boolean;
  handleCloseModal: () => void;
  handleFirebaseAddNewGroup: () => void;
  groupName: string;
  setGroupName: (value: string) => void;
};

export function NewGroupModal({
  modalVisible,
  handleCloseModal,
  handleFirebaseAddNewGroup,
  creatingNewGroup,
  groupName,
  setGroupName,
}: NewGroupModalProps) {
  const [contentIsEmpty, setContentIsEmpty] = useState(false);

  async function callhandleFirebaseAddNewGroup() {
    if (groupName == '') {
      setContentIsEmpty(true);
      return;
    }
    handleFirebaseAddNewGroup();
  }

  useEffect(() => {
    if (groupName !== '') {
      setContentIsEmpty(false);
    }
  }, [groupName]);

  return (
    <Modal animationType="slide" transparent visible={modalVisible}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={S.centeredView} />
      </TouchableWithoutFeedback>
      <View style={S.modalView}>
        <View style={S.modalHeader}>
          <Text />
          <View style={S.modalHeaderTitle}>
            <Text style={S.modalText}>Create new group</Text>
            <AntDesign name="team" size={32} color={colors.text} />
          </View>
          <Pressable style={S.buttonClose} onPress={handleCloseModal}>
            <Text style={S.textStyle}>X</Text>
          </Pressable>
        </View>
        <TextInput
          textAlignVertical="top"
          autoCorrect={false}
          maxLength={20}
          value={groupName}
          placeholder={'Group name'}
          style={S.input}
          placeholderTextColor={colors.text}
          onChangeText={value => {
            setGroupName(value);
          }}
        />
        <Text
          style={{
            color: colors.danger,
            marginBottom: 20,
            alignSelf: 'flex-start',
          }}>
          {contentIsEmpty ? 'Groups must have a name' : ''}
        </Text>
        {creatingNewGroup ? (
          <ActivityIndicator />
        ) : (
          <Pressable
            style={S.createGroupButton}
            onPress={callhandleFirebaseAddNewGroup}>
            <Text style={S.textStyle}>Create</Text>
          </Pressable>
        )}
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
    backgroundColor: colors.overlay,
    alignItems: 'center',
  },
  input: {
    marginTop: 12,
    color: colors.text,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.info,
    height: 50,
    width: '100%',
  },
  modalView: {
    width: '95%',
    position: 'absolute',
    alignSelf: 'center',
    height: 210,
    marginTop: 80,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.text,
  },

  buttonClose: {
    backgroundColor: colors.danger,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 8,
  },
  textStyle: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  createGroupButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 15,
    elevation: 2,
  },

  modalText: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.text,
    fontWeight: 'bold',
    marginLeft: 35,
    marginRight: 5,
    marginTop: 4,
  },
});
