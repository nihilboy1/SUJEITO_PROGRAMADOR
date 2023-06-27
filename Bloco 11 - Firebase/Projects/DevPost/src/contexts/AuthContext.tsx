import {ReactNode, createContext, useState} from 'react';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

type ContextDataProps = {
  loggedInUser: boolean;
};

export const AuthContext = createContext<ContextDataProps>(
  {} as ContextDataProps,
);

type ContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({children}: ContextProviderProps) {
  const [loggedInUser, setLoggedInUser] = useState(false);

  return (
    <AuthContext.Provider value={{loggedInUser}}>
      {children}
    </AuthContext.Provider>
  );
}
