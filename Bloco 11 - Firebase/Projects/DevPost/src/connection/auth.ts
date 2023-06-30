import auth from '@react-native-firebase/auth';

export async function firebaseCreateUser(email: string, password: string) {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const uid = response.user.uid;
    return uid;
  } catch (error) {
    console.log('Erro na função remoteCreateUser');
  } finally {
  }
}
export async function firebaseConnectUser(email: string, password: string) {
  const response = await auth().signInWithEmailAndPassword(email, password);
  const uid = response.user.uid;
  return uid;
}
export async function firebaseDisconnectUser() {
  try {
    await auth().signOut();
  } catch (error) {
    console.log('Erro na função firebaseDisconnectUser');
    throw error;
  }
}
