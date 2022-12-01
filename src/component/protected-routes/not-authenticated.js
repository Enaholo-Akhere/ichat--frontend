import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotAuthenticated = () => {
  const user = useSelector((state) => state.user);

  const auth = user ? true : false;

  return !auth ? <Outlet /> : <Navigate replace={true} to='/' />;
};

export default NotAuthenticated;
