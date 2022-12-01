import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authenticated = () => {
  const user = useSelector((state) => state.user);

  const auth = user ? true : false;

  return auth ? <Outlet /> : <Navigate replace={true} to='/login' />;
};

export default Authenticated;
