import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/mainPage';
import NotFoundPage from './pages/NotFound/notFoundPage';
import LoginPage from './pages/LoginPage/loginPage';
import FavoritesPage from './pages/FavoritesPage/favoritesPage';
import OfferPage from './pages/OfferPage/offerPage';
import PrivateRoute from './components/PrivateRoute/privateRoute';

const App: FC = () => {
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
