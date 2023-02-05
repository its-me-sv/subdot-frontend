import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './containers/app';

import {AppContextProvider} from './contexts/app';
import {SubsocialContextProvider} from './subsocial';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <SubsocialContextProvider>
        <App />
      </SubsocialContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
