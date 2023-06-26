import {auth} from '../Firebase/connection';
import {useAuthContext} from './hooks/useAuthContext';
import {Home} from './pages/private/Home';
import {AuthRoutes} from './routes/AuthRoutes';

export function App() {
  const user = auth.currentUser;
  const {userIsLoggedIn} = useAuthContext();
  console.log(userIsLoggedIn);
  if (user) {
    return <Home />;
  }
  return <AuthRoutes />;
}
