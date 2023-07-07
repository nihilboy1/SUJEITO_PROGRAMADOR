import storage from '@react-native-firebase/storage';

const usersAvatarStorageRef = 'usersAvatar';

export async function storageDownloadUserAvatar(uid: string) {
  try {
    //acessa a referencia do storage remoto, apontando de onde ele pretende realizar a ação de download file. No caso, aqui o local é o usersAvatar/uid
    const imageUrl = await storage()
      .ref(usersAvatarStorageRef)
      .child(uid)
      .getDownloadURL();
    // retorna o download que foi realizado a partir do local
    return imageUrl;
  } catch (error) {
    console.log('Erro na função storageDownloadUserAvatar');
    throw error;
  }
}

export async function storageUploadUserAvatar(filePath: string, uid: string) {
  try {
    //acessa ou cria a referencia do storage remoto, dizendo que ele vai ser usersAvatar/uid
    const res = await storage()
      .ref(usersAvatarStorageRef)
      .child(uid)
      .putFile(filePath);
    // upa a imagem com o filePath x, no local/referencia setada anteriormente

    return res;
  } catch (error) {
    console.log('Erro na função storageUploadUserAvatar');
    throw error;
  }
}

export async function storageDeleteUserAvatar(uid: string) {
  try {
    //acessa ou cria a referencia do storage remoto, dizendo que ele vai ser usersAvatar/uid
    await storage().ref(usersAvatarStorageRef).child(uid).delete();
    // deleta a imagem no path passado
  } catch (error) {
    console.log('Erro na função storageDeleteUserAvatar');
    throw error;
  }
}