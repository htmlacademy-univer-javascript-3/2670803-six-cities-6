import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../Store';
import { AuthorizationStatus } from '../../api/types/auth';

const PrivateRoute: FC = () => {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;
