import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../store';
import { AuthorizationStatus } from '../../api/types/types';

const PrivateRoute: FC = () => {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;
