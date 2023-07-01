import storage from '@react-native-firebase/storage';

export async function remoteStorageDownloadFile(ref: string, uid: string) {
  try {
    const response = await storage().ref(ref).child(uid).getDownloadURL();
    return response;
  } catch (error) {
    console.log('Erro na função remoteStorageDownloadFile');
    return null;
  }
}
