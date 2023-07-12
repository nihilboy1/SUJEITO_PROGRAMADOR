import auth from '@react-native-firebase/auth';

export const FirebaseAuth = {
  CreateUser: async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = response.user.uid;
      return uid;
    } catch (error) {
    } finally {
    }
  },

  ConnectUser: async (email: string, password: string) => {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const uid = response.user.uid;
    return uid;
  },

  DisconnectUser: async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  },
};
