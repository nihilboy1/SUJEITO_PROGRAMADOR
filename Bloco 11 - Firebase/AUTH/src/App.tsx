import {auth} from '../Firebase/connection';
import {useAuthContext} from './hooks/useAuthContext';
import {Home} from './pages/private/Home';
import {AuthRoutes} from './routes/AuthRoutes';

export function App() {
  const user = auth.currentUser;
  console.log(user?.email);
  const {userIsLoggedIn} = useAuthContext();
  if (user) {
    return <Home />;
  }
  return <AuthRoutes />;
}
