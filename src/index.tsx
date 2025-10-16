import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { offers } from './mocks/offers';

const mainPageData = {
  offerCount: offers.length,
  offers: offers,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App mainPageData={mainPageData}/>
  </React.StrictMode>
);
