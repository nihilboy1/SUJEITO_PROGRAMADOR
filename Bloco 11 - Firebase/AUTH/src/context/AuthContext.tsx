import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFromEmailAndPassword,
} from 'firebase/auth';
import {ReactNode, createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {auth} from '../../Firebase/connection';

export type ContextDataProps = {
  user: User;
  userIsLoggedIn: boolean;
  checkIfUserIsLoggedIn: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<ContextDataProps>(
  {} as ContextDataProps,
);

type ContextProviderProps = {
  children: ReactNode;
};

export function ContextProvider({children}: ContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  function checkIfUserIsLoggedIn() {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setUserIsLoggedIn(true);
      } else {
        setUserIsLoggedIn(false);
        setUser({} as User);
      }
    });
  }

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user.email) {
          setUser(user);
          setUserIsLoggedIn(true);
        }
      })
      .catch(error => {
        Alert.alert('Erro ao tentar realizar o login');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async function signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user.email) {
          Alert.alert('Email cadastrado: ', user.email);
        }
      })
      .catch(error => {
        Alert.alert('Erro ao tentar cadastrar o usuário');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async function signOut() {
    await signOutFromEmailAndPassword(auth);
    setUser({} as User);
    setUserIsLoggedIn(false);
  }

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        userIsLoggedIn,
        checkIfUserIsLoggedIn,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
