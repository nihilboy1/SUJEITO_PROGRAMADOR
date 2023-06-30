import {ReactNode, createContext, useEffect, useState} from 'react';
import {
  firebaseConnectUser,
  firebaseCreateUser,
  firebaseDisconnectUser,
} from '../connection/auth';
import {firebaseGetUser, firebaseSetUser} from '../connection/database';
import {
  localStorageDeleteUser,
  localStorageGetUser,
  localStorageSetUser,
} from '../storage/userStorage';
import {userDTO} from '../types/userDTO';

type ContextDataProps = {
  loggedInUser: boolean;
  isLocalUserFetched: boolean;
  user: userDTO | null;
  isAuthLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<ContextDataProps>(
  {} as ContextDataProps,
);

type ContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({children}: ContextProviderProps) {
  const [user, setUser] = useState<userDTO | null>(null);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLocalUserFetched, setIsLocalUserFetched] = useState(false);

  async function signUp(email: string, password: string, name: string) {
    try {
      setIsAuthLoading(true);
      const uid = await firebaseCreateUser(email, password);
      if (uid !== undefined) {
        const user = {
          uid,
          name,
          nameInsensitive: name.toUpperCase(),
          email,
          timeStamp: Date.now(),
        };
        await firebaseSetUser(user, uid);
        await signIn(email, password);
      }
    } catch (error) {
      console.log('Erro na função de signUp');
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsAuthLoading(true);
      const uid = await firebaseConnectUser(email, password);
      if (uid !== undefined) {
        const response = await firebaseGetUser(uid);
        if (response !== undefined) {
          const user = {
            uid: response.uid,
            name: response.name,
            nameInsensitive: response.nameInsensitive,
            email: response.email,
            timeStamp: response.timeStamp,
          } as userDTO;
          await localStorageSetUser(user);
          setUser(user);
          setLoggedInUser(true);
        }
      }
    } catch (error) {
      console.log('Erro na função de signIn');
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function handleLocalStorageGetUser() {
    try {
      setIsLocalUserFetched(false);
      const user = await localStorageGetUser();
      if (user.uid !== undefined) {
        setUser(user);
        setLoggedInUser(true);
      }
    } catch {
      console.log('Erro na função handleLocalStorageGetUser ');
    } finally {
      setIsLocalUserFetched(true);
    }
  }

  async function signOut() {
    await firebaseDisconnectUser();
    await localStorageDeleteUser();
    setUser(null);
    setIsAuthLoading(false);
    setLoggedInUser(false);
  }

  useEffect(() => {
    handleLocalStorageGetUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLocalUserFetched,
        isAuthLoading,
        loggedInUser,
        signUp,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
