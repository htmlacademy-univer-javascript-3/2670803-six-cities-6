import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './components/Store';
import App from './App';
import { offers } from './mocks/offers';
import 'leaflet/dist/leaflet.css';

const mainPageData = {
  offerCount: offers.length,
  offers: offers,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App mainPageData={mainPageData}/>
    </Provider>
  </React.StrictMode>
);
