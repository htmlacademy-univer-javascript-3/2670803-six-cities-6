import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mainPageData = {
  offerCount: 312,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App mainPageData={mainPageData}/>
  </React.StrictMode>
);
