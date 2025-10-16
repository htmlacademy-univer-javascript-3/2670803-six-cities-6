import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/mainPage';
import { MainPageProps } from './components/types';
import NotFoundPage from './pages/NotFound/notFoundPage';
import LoginPage from './pages/LoginPage/loginPage';
import FavoritesPage from './pages/FavoritesPage/favoritesPage';
import OfferPage from './pages/OfferPage/offerPage';
import PrivateRoute from './components/PrivateRoute/privateRoute';
import { offers } from './mocks/offers';

type AppProps = {
  mainPageData: MainPageProps;
}

const App: FC<AppProps> = ({mainPageData}) => {
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage {...mainPageData} />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
          <Route path="/favorites" element={<FavoritesPage offers={offers} />} />
        </Route>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
