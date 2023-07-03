import storage from '@react-native-firebase/storage';

export async function storageDownloadUserAvatar(uid: string) {
  try {
    //acessa a referencia do storage remoto, apontando de onde ele pretende realizar a ação de download file. No caso, aqui o local é o users/uid
    const response = await storage().ref('users').child(uid).getDownloadURL();
    // retorna o download que foi realizado a partir do local
    return response;
  } catch (error) {
    console.log('Erro na função storageDownloadUserAvatar');
    throw error;
  }
}

export async function storageUploadUserAvatar(filePath: string, uid: string) {
  try {
    //acessa ou cria a referencia do storage remoto, dizendo que ele vai ser users/uid
    const usersStorageReference = storage().ref('users').child(uid);
    // upa a imagem com o filePath x, no local/referencia setada anteriormente
    return await usersStorageReference.putFile(filePath);
  } catch (error) {
    console.log('Erro na função storageUploadUserAvatar');
    throw error;
  }
}
