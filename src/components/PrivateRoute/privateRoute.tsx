import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../Store';

const PrivateRoute: FC = () => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return authorizationStatus === 'AUTH' ? (<Outlet />) : (<Navigate to="/login" replace />);
};

export default PrivateRoute;
