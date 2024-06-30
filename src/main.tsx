import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import store from './app/providers/store';
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
import "./assets/fonts/fonts.css"

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
