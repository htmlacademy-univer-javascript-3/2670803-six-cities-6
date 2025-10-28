import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/mainPage';
import NotFoundPage from './pages/NotFound/notFoundPage';
import LoginPage from './pages/LoginPage/loginPage';
import FavoritesPage from './pages/FavoritesPage/favoritesPage';
import OfferPage from './pages/OfferPage/offerPage';
import PrivateRoute from './components/PrivateRoute/privateRoute';
import { offers } from './mocks/offers';
import { Provider } from 'react-redux';
import { store } from './components/Store';

const App: FC = () => {
  const isAuthorized = false;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
            <Route path="/favorites" element={<FavoritesPage offers={offers} />} />
          </Route>
          <Route path="/offer/:id" element={<OfferPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
