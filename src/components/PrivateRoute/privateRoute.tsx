import { Navigate } from 'react-router-dom';
import { FC, ReactElement } from 'react';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: ReactElement;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthorized, children }) =>
  isAuthorized ? children : <Navigate to="/login" replace />;

export default PrivateRoute;
