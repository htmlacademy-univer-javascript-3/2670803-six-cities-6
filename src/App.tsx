import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import LoginPage from './pages/login-page/login-page';
import FavoritesPage from './pages/favorites-page/favorites-page';
import OfferPage from './pages/offer-page/offer-page';
import PrivateRoute from './components/private-route/private-route';
import { useAppDispatch, useAppSelector } from './components/store';
import Spinner from './components/spinner/spinner';
import { checkAuth, logout } from './components/store/user/user-thunks';
import { AuthorizationStatus } from './api/types/types';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(logout()).then(() => {});
  };

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner isLoading text="Checking authentication..." minDuration={500} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={
          <NotFoundPage
            authorizationStatus={authorizationStatus}
            user={user}
            handleSignOut={handleSignOut}
          />
        }
        />
        <Route path="/login" element={authorizationStatus === AuthorizationStatus.Auth ? (<Navigate to="/" replace />) : (<LoginPage />)}/>
        <Route element={<PrivateRoute />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
