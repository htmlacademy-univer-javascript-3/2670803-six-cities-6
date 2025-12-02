import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/mainPage';
import NotFoundPage from './pages/NotFound/notFoundPage';
import LoginPage from './pages/LoginPage/loginPage';
import FavoritesPage from './pages/FavoritesPage/favoritesPage';
import OfferPage from './pages/OfferPage/offerPage';
import PrivateRoute from './components/PrivateRoute/privateRoute';
import { useAppDispatch, useAppSelector } from './components/Store';
import Spinner from './components/Spinner/Spinner';
import { checkAuth } from './components/Store/api-actions';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (authorizationStatus === 'UNKNOWN') {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={authorizationStatus === 'AUTH' ? (<Navigate to="/" replace />) : (<LoginPage />)}/>
        <Route element={<PrivateRoute isAuthorized={authorizationStatus === 'AUTH'} />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
