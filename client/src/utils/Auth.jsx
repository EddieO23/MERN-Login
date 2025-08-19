import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Auth() {
  return isLoggedIn() ? <Outlet /> : <Navigate to='/' />;
}

export default Auth;

const isLoggedIn = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  const { exp } = jwtDecode(token);

  // console.log(exp, Date.now());

  if (exp * 1000 > Date.now()) {
    return true;
  } else {
    localStorage.clear()
    return false
  }
};
