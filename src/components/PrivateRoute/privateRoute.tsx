import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';

type PrivateRouteProps = {
  isAuthorized: boolean;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthorized }) =>
  isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;

export default PrivateRoute;
