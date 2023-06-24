import {User} from 'firebase/auth';
import {ReactNode, createContext, useState} from 'react';
import {createNewUser, loginUser} from '../../Firebase/auth';

export type ContextDataProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSignUp: () => void;
  handleSignIn: () => void;
};

export const AuthContext = createContext<ContextDataProps>(
  {} as ContextDataProps,
);

type ContextProviderProps = {
  children: ReactNode;
};

export function ContextProvider({children}: ContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSignUp() {
    createNewUser(email, password, setUser);
    setEmail('');
    setPassword('');
  }

  async function handleSignIn() {
    const loginSuccess: boolean = await loginUser(email, password, setUser);

    if (loginSuccess) {
      console.log('Usuário logado com sucesso!');
    }
  }
  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        setEmail,
        setPassword,
        handleSignUp,
        handleSignIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
